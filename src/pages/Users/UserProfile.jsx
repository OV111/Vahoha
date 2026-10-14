import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Ellipsis, MapPin, MessageSquare, Pencil } from "lucide-react";
import { fetchUserProfile, toggleFollow } from "@/services/usersApi";
import { fetchUserBlogs } from "@/services/blogsApi";
import BlogCard from "@/components/blog/BlogCard";
import useProfileStore from "@/stores/useProfileStore";
import ProfileSkeleton from "./ProfileSkeleton";
import SOCIAL_LINKS from "../../../constants/socialLinks";
import { SectionHeader, ForHiringPanel } from "../my-profile/components/ProfileSections";
import { CertificateCard, EmptyState, ExamRow } from "@/features/profile/components/ProfileProgress";
import ProfileBanner from "@/features/profile/components/ProfileBanner";
import { formatLastActive, summarizeProfile } from "@/features/profile/lib/profileSummary";

const UserNotFound = () => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-violet-950/40">
      <svg className="h-9 w-9 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
    <h1 className="text-2xl font-bold text-gray-100">User not found</h1>
    <p className="mt-2 text-sm text-gray-500 max-w-xs">
      The profile you&apos;re looking for doesn&apos;t exist or has been removed.
    </p>
    <Link
      to="/"
      className="mt-6 rounded-full bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-500 transition shadow-sm shadow-violet-500/20"
    >
      Go home
    </Link>
  </div>
);

// Same outlined button the owner's page uses for "Edit profile".
const MENU_ITEM =
  "w-full cursor-pointer rounded-lg border border-transparent bg-white/5 px-3 py-2 text-left text-sm font-medium text-white/80 transition-all duration-200 hover:border-white/10 hover:bg-white/10";

const OUTLINE_BUTTON =
  "inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-medium text-gray-100 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400";

export default function UserProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: loggedInUser } = useProfileStore();
  const isOwnProfile = loggedInUser?.username === username;
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [progress, setProgress] = useState(null);
  const [examHistory, setExamHistory] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Same headline as the owner's page, from what the public endpoint exposes:
  // layers passed (completedLayers) and approved capstones.
  const summary = useMemo(
    () =>
      summarizeProfile({
        tracks: [{ eligibility: { passed: progress?.completedLayers?.length ?? 0 } }],
        certificates,
      }),
    [progress, certificates],
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    const handleEsc = (e) => { if (e.key === "Escape") setIsMenuOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const response = await fetchUserProfile(username);
        const fetchedStats = response.stats ?? {};
        setUser(response.targetUser ?? null);
        setStats(fetchedStats);
        setProgress(response.progress ?? null);
        setExamHistory(response.examHistory ?? []);
        setCertificates(response.certificates ?? []);
        setIsFollowing(Boolean(response.isFollowing));
        setIsFollower(Boolean(response.isFollower));
        if (fetchedStats.userId) {
          const blogsData = await fetchUserBlogs(fetchedStats.userId, 6);
          setBlogs(blogsData);
        }
      } catch (err) {
        if (err.redirect) {
          navigate(`/users/${err.redirect}`, { replace: true });
          return;
        }
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username, navigate]);

  const handleFollowToggle = async () => {
    if (followLoading) return;
    setFollowLoading(true);
    const wasFollowing = isFollowing;
    setIsFollowing(!wasFollowing);
    setStats((prev) => ({
      ...prev,
      followersCount: (prev?.followersCount ?? 0) + (wasFollowing ? -1 : 1),
    }));
    try {
      const res = await toggleFollow(username, wasFollowing);
      if (!res.ok) throw new Error();
      toast.success(wasFollowing ? "Unfollowed" : "Now following!");
    } catch {
      setIsFollowing(wasFollowing);
      setStats((prev) => ({
        ...prev,
        followersCount: (prev?.followersCount ?? 0) + (wasFollowing ? 1 : -1),
      }));
      toast.error("Something went wrong");
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) return <ProfileSkeleton />;
  if (notFound || !user) return <UserNotFound />;

  const lastActive = formatLastActive(stats?.lastActive);
  const lastActiveLabel = lastActive.startsWith("Active") ? lastActive : `Last active ${lastActive}`;
  const authorInitial =
    `${user?.firstName ?? ""}${user?.lastName ?? ""}`.charAt(0).toUpperCase() || "?";
  const who = isOwnProfile ? "You haven't" : `${user?.firstName ?? "This user"} hasn't`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">

      <div className="max-w-6xl mx-auto">
        <ProfileBanner url={stats?.bannerImage}>
          <div className="absolute -bottom-10 sm:-bottom-13 lg:-bottom-14 left-14 sm:left-16 lg:left-10 -translate-x-1/2 lg:translate-x-0 z-1">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-3 border-white dark:border-gray-900 shadow-sm">
              {stats?.profileImage ? (
                <img
                  src={stats.profileImage.replace("/upload/", "/upload/w_112,h_112,c_fill,f_auto,q_auto/")}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-white text-2xl sm:text-3xl font-bold">
                  {authorInitial}
                </div>
              )}
            </div>
          </div>
        </ProfileBanner>

        {/* Profile header: same structure, spacing and type sizes as /my-profile */}
        <div className="px-4 pt-16 sm:px-6 lg:px-10 lg:pt-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="space-y-1 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {user?.firstName} {user?.lastName}
                </h1>
                {isFollower && (
                  <span className="rounded-full bg-violet-100 dark:bg-violet-950/60 px-2.5 py-0.5 text-xs font-semibold text-violet-600 dark:text-violet-400 ring-1 ring-violet-200 dark:ring-violet-900/60">
                    Follows you
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">@{user?.username}</p>
              {summary.headline && (
                <p className="text-sm font-semibold dark:text-purple-600">{summary.headline}</p>
              )}
              <p className="text-gray-700 dark:text-gray-300">{stats?.bio || "No bio yet."}</p>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                {stats?.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {stats.location}
                  </span>
                )}
                <span>{lastActiveLabel}</span>
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-6">
              {/* Your own page offers "Edit profile" (as on /my-profile); others get Follow / Message. */}
              <div className="flex items-center gap-2">
                {isOwnProfile ? (
                  <Link to="/my-profile/settings" className={OUTLINE_BUTTON}>
                    <Pencil size={14} />
                    Edit profile
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleFollowToggle}
                      disabled={followLoading}
                      className={`group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400 ${
                        isFollowing
                          ? "border border-white/15 bg-transparent text-neutral-200 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300"
                          : "bg-purple-600 text-white hover:bg-purple-500"
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <span className="flex items-center gap-1.5 group-hover:hidden">
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            Following
                          </span>
                          <span className="hidden group-hover:flex items-center">Unfollow</span>
                        </>
                      ) : (
                        "Follow"
                      )}
                    </button>

                    <Link
                      to="/my-profile/chats"
                      state={{
                        chatWith: {
                          _id: user._id,
                          firstName: user.firstName,
                          lastName: user.lastName,
                          username: user.username,
                          stats: { profileImage: stats?.profileImage ?? null },
                        },
                      }}
                      className={OUTLINE_BUTTON}
                    >
                      <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                      Message
                    </Link>
                  </>
                )}

                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    aria-label="More options"
                    aria-expanded={isMenuOpen}
                    aria-haspopup="menu"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-2xl bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
                  >
                    <Ellipsis className="h-4 w-4 lg:h-5 lg:w-5" />
                  </button>

                  {isMenuOpen && (
                    <ul role="menu" className="absolute right-0 z-10 mt-2 grid w-52 gap-1 overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-2 shadow-xl shadow-black/40 backdrop-blur-sm">
                      {[
                        {
                          label: "Copy profile link",
                          onClick: () => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success("Link copied!");
                            setIsMenuOpen(false);
                          },
                        },
                        {
                          label: "Share profile",
                          onClick: () => {
                            if (navigator.share) {
                              navigator.share({ url: window.location.href });
                            } else {
                              navigator.clipboard.writeText(window.location.href);
                              toast.success("Link copied!");
                            }
                            setIsMenuOpen(false);
                          },
                        },
                      ].map((item) => (
                        <li key={item.label} role="none">
                          <button
                            type="button"
                            role="menuitem"
                            onClick={item.onClick}
                            className={MENU_ITEM}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                      {!isOwnProfile &&
                        ["Report user", "Block user"].map((label) => (
                          <li key={label} role="none">
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => setIsMenuOpen(false)}
                              className={`${MENU_ITEM} text-red-300! hover:bg-red-950/40!`}
                            >
                              {label}
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex gap-8">
                {[
                  { label: "Followers", value: stats?.followersCount ?? 0 },
                  { label: "Following", value: stats?.followingsCount ?? 0 },
                  { label: "Posts", value: stats?.postsCount ?? 0 },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-base font-bold text-gray-900 dark:text-gray-100 lg:text-xl">{item.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Only links the user actually set, like /my-profile (no greyed-out dead icons). */}
              <div className="flex items-center gap-6 text-2xl text-gray-600 dark:text-gray-400">
                {SOCIAL_LINKS.filter((item) => stats?.[item.key]).map((item) => {
                  const Icon = item.icon;
                  return (
                  <a
                    key={item.key}
                    href={stats[item.key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className={`relative transition after:absolute after:-inset-2.5 ${item.hover}`}
                  >
                    <Icon size={22} />
                  </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content. Below xl: one column, hiring panel first. xl+: main + right column. */}
        <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-10 mt-6 pb-16 xl:flex-row">
          <aside className="order-first w-full shrink-0 xl:order-last xl:w-60">
            <SectionHeader title="For hiring" />
            <ForHiringPanel cvUrl={stats?.cvUrl ?? null} />
          </aside>

          <div className="flex-1 min-w-0 space-y-8">
            <section>
              <SectionHeader title="Paths" />
              {progress?.activePath ? (
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-neutral-100">{progress.activePath}</p>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      {progress.currentLayer ? `Layer ${progress.currentLayer} · ` : ""}
                      {(progress.completedLayers ?? []).length} layer
                      {(progress.completedLayers ?? []).length === 1 ? "" : "s"} passed
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-amber-500">In progress</span>
                </div>
              ) : (
                <EmptyState title="No roadmap path yet" body={`${who} started a roadmap path yet.`} />
              )}
            </section>

            <section>
              <SectionHeader title="Capstones" right="AI-reviewed" />
              {certificates.length > 0 ? (
                <div className="space-y-3">
                  {certificates.map((c) => (
                    <CertificateCard key={c.publicId} cert={c} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No approved capstone yet"
                  body={`${isOwnProfile ? "Your" : `${user?.firstName ?? "This user"}'s`} approved capstones appear here, each with a link anyone can check.`}
                />
              )}
            </section>

            <section>
              <SectionHeader
                title="Exam history"
                right={examHistory.length > 0 ? `${examHistory.length} attempts` : undefined}
              />
              {examHistory.length > 0 ? (
                <ul className="space-y-2">
                  {examHistory.map((e) => (
                    <ExamRow key={String(e._id)} exam={e} />
                  ))}
                </ul>
              ) : (
                <EmptyState title="No exams taken yet" />
              )}
            </section>

            <section>
              <SectionHeader
                title="Posts"
                right={(stats?.postsCount ?? 0) > 0 ? String(stats.postsCount) : undefined}
              />
              {blogs.length === 0 ? (
                <EmptyState title="No posts yet" body={`${who} published anything yet.`} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.slice(0, 6).map((blog) => (
                    <BlogCard key={String(blog._id)} card={blog} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
