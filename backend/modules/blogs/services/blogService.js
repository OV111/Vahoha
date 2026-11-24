import { ObjectId } from "mongodb";
import { createTtlCache } from "../../../utils/ttlCache.js";
import { ForbiddenError, NotFoundError, ValidationError } from "../../../utils/httpErrors.js";

const MAX_LAYER_IDS = 10;
const LAYER_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,59}$/;

const SORT_KEYS = { Popular: "popular", Oldest: "oldest", "Most Viewed": "views", Trending: "views" };
const READ_TIMES = new Set(["< 5 min", "5–10 min", "10+ min"]);
const MAX_KEY_LENGTH = 300;
const MAX_PAGE = 100_000;
const STATUSES = new Set(["draft", "published"]);

/**
 * Cleans the `layerIds` a post is tagged with. Accepts an array or a JSON
 * string (blog forms are multipart/FormData, so arrays arrive as strings, the
 * same way `tags` do). Invalid ids are dropped, duplicates removed, and the
 * list is capped. Never throws: a bad tag must not lose the author their post.
 */
export const normalizeLayerIds = (raw) => {
  let list = raw;
  if (typeof raw === "string") {
    try {
      list = JSON.parse(raw);
    } catch {
      list = [];
    }
  }
  if (!Array.isArray(list)) return [];
  const clean = list
    .filter((id) => typeof id === "string")
    .map((id) => id.trim().toLowerCase())
    .filter((id) => LAYER_ID_PATTERN.test(id));
  return [...new Set(clean)].slice(0, MAX_LAYER_IDS);
};

// Tags arrive as an array or a JSON string, like layerIds; anything else becomes no tags.
const parseTags = (raw) => {
  let tags = raw;
  if (typeof raw === "string") {
    try {
      tags = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return Array.isArray(tags) ? tags.filter((tag) => typeof tag === "string") : [];
};

const checkStatus = (status) => {
  if (status && !STATUSES.has(status)) throw new ValidationError("Status must be draft or published");
};

// Keeps letters of every alphabet, so Armenian and Russian titles get a real slug.
const slugify = (title) => {
  const slug = title
    .normalize("NFC")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{M}\p{N}_-]/gu, "");
  return /[\p{L}\p{N}]/u.test(slug) ? slug : "post";
};

// `ownId` is the post being edited, which may keep its own slug.
const makeUniqueSlug = async (blogs, title, ownId = null) => {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;
  while (await blogs.findOne({ slug, _id: { $ne: ownId } })) {
    slug = `${baseSlug}-${counter++}`;
  }
  return slug;
};

const clampInt = (raw, fallback, max) => {
  const number = Number.parseInt(raw, 10);
  return Number.isNaN(number) ? fallback : Math.min(max, Math.max(1, number));
};

const readPaging = ({ page, limit }) => ({
  pageNumber: clampInt(page, 1, MAX_PAGE),
  limitNumber: clampInt(limit, 10, 100),
});

/** Mongo filter for posts this viewer may open: a draft is visible only to its author. */
export const visibleTo = (viewerId) => {
  const notDraft = { status: { $ne: "draft" } };
  return viewerId ? { $or: [notDraft, { author: new ObjectId(viewerId) }] } : notDraft;
};

export const buildBlogDocument = ({
  title,
  description,
  content,
  tags,
  category,
  difficulty,
  status,
  coverImage,
  author,
  slug,
  layerIds,
}) => {
  const words = content?.trim().split(/\s+/).filter(Boolean).length ?? 0;

  return {
    title,
    slug,
    category,
    difficulty,
    description,
    content,
    tags,
    layerIds: layerIds ?? [],
    status: status || "draft",
    author,
    readTime: Math.max(1, Math.ceil(words / 200)),
    coverImage: coverImage ?? null,
    likes: [],
    comments: [],
    views: 0,
    wordCount: words,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const authorLookup = [
  {
    $lookup: {
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "author",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            username: 1,
          },
        },
      ],
    },
  },
  {
    $unwind: {
      path: "$author",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "usersStats",
      localField: "author._id",
      foreignField: "userId",
      as: "authorProfile",
      pipeline: [
        {
          $project: {
            profileImage: 1,
            bio: 1,
            followersCount: 1,
          },
        },
      ],
    },
  },
  {
    $unwind: {
      path: "$authorProfile",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $addFields: {
      "author.userName": "$author.username",
      "author.pictures": "$authorProfile.profileImage",
      "author.bio": "$authorProfile.bio",
      "author.followersCount": "$authorProfile.followersCount",
    },
  },
  {
    $project: {
      authorProfile: 0,
      "author.username": 0,
    },
  },
];

// The public list is the same for everyone (like and save state come from their
// own signed-in endpoints). Writes here clear it, so thirty seconds only bounds
// what this process can't see: view counts (which feed "Most Viewed") and other instances.
const blogListCache = createTtlCache({ name: "blogList", ttlMs: 30_000, maxEntries: 200 });
export const clearBlogListCache = () => blogListCache.clear("list:");

// The list can be cached only when every input has the plain shape the key assumes.
const isPlain = (v) => v === undefined || typeof v === "string" || (Array.isArray(v) && v.every((x) => typeof x === "string"));

const blogListKey = ({ category, tag, layer, page, limit, difficulty, readTime, sort, filter }) => {
  const by = sort || filter;
  const { pageNumber, limitNumber } = readPaging({ page, limit });
  return [
    "list:",
    JSON.stringify(category || ""),
    JSON.stringify(tag ? [].concat(tag).sort() : []),
    JSON.stringify(difficulty || ""),
    typeof layer === "string" && LAYER_ID_PATTERN.test(layer) ? layer : "",
    READ_TIMES.has(readTime) ? readTime : "",
    typeof by === "string" && Object.hasOwn(SORT_KEYS, by) ? SORT_KEYS[by] : "latest",
    pageNumber,
    limitNumber,
  ].join("|");
};

const loadBlogs = async (db, query) => {
  const { category, tag, layer, difficulty, readTime, sort, filter, q } = query;
  const { pageNumber, limitNumber } = readPaging(query);

  const matchFilter = { status: "published" };
  if (category) matchFilter.category = category;
  if (tag) matchFilter.tags = { $in: Array.isArray(tag) ? tag : [tag] };
  if (difficulty) matchFilter.difficulty = difficulty;
  // Title search. Escaped so user input is matched literally — an unescaped
  // "(a+)+" would be a regex the DB has to evaluate (ReDoS). Capped length
  // for the same reason. typeof guards against ?q=a&q=b arriving as an array.
  if (typeof q === "string" && q.trim()) {
    const term = q.trim().slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    matchFilter.title = { $regex: term, $options: "i" };
  }
  // typeof check: a repeated ?layer=a&layer=b arrives as an array, and a
  // string is the only shape that matches one element of `layerIds`.
  if (typeof layer === "string" && LAYER_ID_PATTERN.test(layer)) matchFilter.layerIds = layer;
  if (readTime === "< 5 min") matchFilter.readTime = { $lt: 5 };
  else if (readTime === "5–10 min") matchFilter.readTime = { $gte: 5, $lte: 10 };
  else if (readTime === "10+ min") matchFilter.readTime = { $gt: 10 };

  const blogsCollection = db.collection("blogs");
  const total = await blogsCollection.countDocuments(matchFilter);

  const effectiveSort = sort || filter;
  let pipeline;
  if (effectiveSort === "Popular") {
    pipeline = [
      { $match: matchFilter },
      { $addFields: { _likesCount: { $size: { $ifNull: ["$likes", []] } } } },
      { $sort: { _likesCount: -1 } },
      { $skip: (pageNumber - 1) * limitNumber },
      { $limit: limitNumber },
      { $project: { _likesCount: 0 } },
      ...authorLookup,
    ];
  } else {
    let sortStage;
    if (effectiveSort === "Oldest") sortStage = { createdAt: 1 };
    else if (effectiveSort === "Most Viewed" || effectiveSort === "Trending") sortStage = { views: -1 };
    else sortStage = { createdAt: -1 };
    pipeline = [
      { $match: matchFilter },
      { $sort: sortStage },
      { $skip: (pageNumber - 1) * limitNumber },
      { $limit: limitNumber },
      ...authorLookup,
    ];
  }

  const blogs = await blogsCollection.aggregate(pipeline).toArray();
  return {
    data: blogs,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      hasNextPage: pageNumber * limitNumber < total,
      hasPrevPage: pageNumber > 1,
    },
  };
};

export const getBlogsService = (db, query) => {
  const { q, category, tag, difficulty } = query;
  // A title search is open-ended (every typed word is a new key): always ask the database.
  const searching = typeof q === "string" && q.trim() !== "";
  if (searching || ![category, tag, difficulty].every(isPlain)) return loadBlogs(db, query);
  const key = blogListKey(query);
  return key.length > MAX_KEY_LENGTH ? loadBlogs(db, query) : blogListCache.wrap(key, () => loadBlogs(db, query));
};

export const getBlogByIdService = async (db, rawId, viewerId = null) => {
  const blogs = db.collection("blogs");
  const match = { _id: new ObjectId(rawId), ...visibleTo(viewerId) };
  const [blog] = await blogs.aggregate([{ $match: match }, ...authorLookup]).toArray();

  if (!blog) throw new NotFoundError("Blog not found");
  await blogs.updateOne({ _id: blog._id }, { $inc: { views: 1 } });

  return blog;
};

export const getBlogBySlugService = async (db, slug) => {
  const blogs = db.collection("blogs");

  const [blog] = await blogs
    .aggregate([{ $match: { slug, status: "published" } }, ...authorLookup])
    .toArray();

  if (!blog) throw new NotFoundError("Blog not found");

  await blogs.updateOne({ _id: blog._id }, { $inc: { views: 1 } });

  return blog;
};

export const getUserBlogsService = async (db, userId) => {
  const blogsCollection = db.collection("blogs");
  const blogs = await blogsCollection
    .aggregate([
      { $match: { author: new ObjectId(userId), status: "published" } },
      { $sort: { createdAt: -1 } },
      ...authorLookup,
    ])
    .toArray();
  return blogs;
};

export const getUserAllBlogsService = async (db, userId) => {
  const blogsCollection = db.collection("blogs");
  const uid = userId instanceof ObjectId ? userId : new ObjectId(String(userId));
  return blogsCollection.find({ author: uid }).sort({ createdAt: -1 }).toArray();
};

export const createBlogService = async (db, body, user, file) => {
  const blogs = db.collection("blogs");
  const users = db.collection("users");
  const statsCollection = db.collection("usersStats");

  if (!body.title || !body.content || !body.category) {
    throw new ValidationError("Title, content and category are required");
  }
  checkStatus(body.status);

  const slug = await makeUniqueSlug(blogs, body.title);
  const authorId =
    user._id instanceof ObjectId ? user._id : new ObjectId(String(user._id));

  const doc = buildBlogDocument({
    ...body,
    slug,
    tags: parseTags(body.tags),
    layerIds: normalizeLayerIds(body.layerIds),
    coverImage: file?.path ?? null,
    author: authorId,
  });
  const result = await blogs.insertOne(doc);
  clearBlogListCache();
  const [authorData, statsData] = await Promise.all([
    users.findOne(
      { _id: authorId },
      {
        projection: {
          firstName: 1,
          lastName: 1,
          username: 1,
          pictures: 1,
        },
      },
    ),
    statsCollection.findOne({ userId: authorId }),
  ]);
  return {
    ...doc,
    _id: result.insertedId,
    author: authorData
      ? {
        _id: authorData._id,
        firstName: authorData.firstName,
        lastName: authorData.lastName,
        userName: authorData.username,
        pictures: statsData?.profileImage ?? null,
      }
      : null,
  };
};

export const updateBlogService = async (db, blogId, userId, body, file) => {
  const blogs = db.collection("blogs");
  const id = new ObjectId(blogId);
  const uid = userId instanceof ObjectId ? userId : new ObjectId(String(userId));

  const existing = await blogs.findOne({ _id: id });
  if (!existing) throw new NotFoundError("Blog not found");
  if (existing.author.toString() !== uid.toString()) throw new ForbiddenError("You can only change your own posts");

  checkStatus(body.status);

  const content = body.content ?? existing.content;
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  const titleChanged = body.title && body.title !== existing.title;
  const slug = titleChanged ? await makeUniqueSlug(blogs, body.title, id) : existing.slug;

  const setFields = {
    title: body.title ?? existing.title,
    slug,
    description: body.description ?? existing.description,
    content,
    tags: body.tags !== undefined ? parseTags(body.tags) : existing.tags,
    category: body.category ?? existing.category,
    difficulty: body.difficulty ?? existing.difficulty,
    layerIds: body.layerIds !== undefined ? normalizeLayerIds(body.layerIds) : (existing.layerIds ?? []),
    status: body.status || existing.status,
    readTime: Math.max(1, Math.ceil(words / 200)),
    wordCount: words,
    updatedAt: new Date(),
  };
  if (file?.path) setFields.coverImage = file.path;

  await blogs.updateOne({ _id: id }, { $set: setFields });
  clearBlogListCache();
  return { ...existing, ...setFields, _id: id };
};

export const deleteBlogService = async (db, blogId, userId) => {
  const blogs = db.collection("blogs");
  const id = new ObjectId(blogId);
  const uid = userId instanceof ObjectId ? userId : new ObjectId(String(userId));

  const existing = await blogs.findOne({ _id: id });
  if (!existing) throw new NotFoundError("Blog not found");
  if (existing.author.toString() !== uid.toString()) throw new ForbiddenError("You can only change your own posts");

  // The post goes last: if a step before it fails, the author can retry.
  await Promise.all([
    db.collection("comments").deleteMany({ blogId: id }),
    db.collection("favouriteBlogs").deleteMany({ blogId: id }),
  ]);
  await blogs.deleteOne({ _id: id });
  clearBlogListCache();
  return { deleted: true };
};

export const toggleLikeService = async (db, blogId, userId) => {
  const blogs = db.collection("blogs");
  const id = new ObjectId(blogId);
  const uid = new ObjectId(userId);

  const blog = await blogs.findOne({ _id: id, ...visibleTo(userId) }, { projection: { likes: 1 } });
  if (!blog) throw new NotFoundError("Blog not found");

  const alreadyLiked = blog.likes.some((l) => l.toString() === uid.toString());

  await blogs.updateOne(
    { _id: id },
    alreadyLiked ? { $pull: { likes: uid } } : { $addToSet: { likes: uid } },
  );
  clearBlogListCache(); // the list shows the likes

  return {
    liked: !alreadyLiked,
    likesCount: alreadyLiked ? blog.likes.length - 1 : blog.likes.length + 1,
  };
};

export const getLikedIdsService = async (db, userId) => {
  const blogs = db.collection("blogs");
  const uid = new ObjectId(userId);
  const docs = await blogs
    .find({ likes: uid }, { projection: { _id: 1 } })
    .toArray();
  return docs.map((d) => d._id.toString());
};

export const toggleFavouriteService = async (db, blogId, userId) => {
  const favourites = db.collection("favouriteBlogs");
  const bid = new ObjectId(blogId);
  const uid = new ObjectId(userId);

  const existing = await favourites.findOne({ userId: uid, blogId: bid });

  if (existing) {
    await favourites.deleteOne({ _id: existing._id });
    return { saved: false };
  } else {
    await favourites.insertOne({
      userId: uid,
      blogId: bid,
      savedAt: new Date(),
    });
    return { saved: true };
  }
};

export const getSavedIdsService = async (db, userId) => {
  const favourites = db.collection("favouriteBlogs");
  const docs = await favourites
    .find({ userId: new ObjectId(userId) }, { projection: { blogId: 1 } })
    .toArray();
  return docs.map((d) => d.blogId.toString());
};

export const getFavouritesService = async (db, userId) => {
  const favourites = db.collection("favouriteBlogs");
  const uid = new ObjectId(userId);

  const saved = await favourites
    .aggregate([
      { $match: { userId: uid } },
      { $sort: { savedAt: -1 } },
      {
        $lookup: {
          from: "blogs",
          localField: "blogId",
          foreignField: "_id",
          as: "blog",
        },
      },
      { $unwind: "$blog" },
      { $match: { "blog.status": "published" } },
      {
        $lookup: {
          from: "users",
          localField: "blog.author",
          foreignField: "_id",
          as: "blog.author",
          pipeline: [
            { $project: { _id: 1, firstName: 1, lastName: 1, username: 1 } },
            // The card shows the author's photo when they have one.
            {
              $lookup: {
                from: "usersStats",
                localField: "_id",
                foreignField: "userId",
                as: "stats",
                pipeline: [{ $project: { profileImage: 1 } }],
              },
            },
            { $addFields: { pictures: { $arrayElemAt: ["$stats.profileImage", 0] } } },
            { $project: { stats: 0 } },
          ],
        },
      },
      { $unwind: "$blog.author" },
      { $replaceRoot: { newRoot: "$blog" } },
    ])
    .toArray();

  return saved;
};
