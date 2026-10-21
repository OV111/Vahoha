export const createPostService = async (db, { title, text, category, file }, authorId) => {
  const blogs = db.collection("blogs");
  await blogs.insertOne({ title, text, category, file, authorId, createdAt: new Date() });
};
