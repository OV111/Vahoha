import { useState } from "react";
import { toast } from "sonner";
import useAuthStore from "@/stores/useAuthStore";
import useBlogInteractionsStore from "@/features/blogs/useBlogInteractionsStore";
import { toggleBlogFavourite, toggleBlogLike } from "@/services/blogsApi";
import { captureEvent } from "@/lib/posthog";

/**
 * Like / save for one post, with optimistic updates that roll back on failure.
 * Same endpoints and store as BlogCard, so a like made here shows on the card.
 * Built-in ("sys") posts and signed-out visitors can't interact.
 */
export default function useBlogActions({ rawId, isDefault, initialLikes }) {
  const { auth } = useAuthStore();
  const { savedIds, likedIds, toggleSaved, toggleLiked } = useBlogInteractionsStore();

  const [likesCount, setLikesCount] = useState(initialLikes);
  const [likeBusy, setLikeBusy] = useState(false);
  const [saveBusy, setSaveBusy] = useState(false);

  const canInteract = Boolean(auth) && !isDefault;
  const liked = likedIds.has(rawId);
  const saved = savedIds.has(rawId);

  const toggleLike = async () => {
    if (!canInteract || likeBusy) return;
    const wasLiked = liked;
    toggleLiked(rawId);
    setLikesCount((n) => (wasLiked ? n - 1 : n + 1));
    setLikeBusy(true);
    try {
      const data = await toggleBlogLike(rawId);
      setLikesCount(data.likesCount);
      if (!wasLiked) captureEvent("blog_liked", { blog_id: rawId });
    } catch {
      toggleLiked(rawId);
      setLikesCount((n) => (wasLiked ? n + 1 : n - 1));
      toast.error("Couldn't update your like. Try again.");
    } finally {
      setLikeBusy(false);
    }
  };

  const toggleSave = async () => {
    if (!canInteract || saveBusy) return;
    const wasSaved = saved;
    toggleSaved(rawId);
    setSaveBusy(true);
    try {
      await toggleBlogFavourite(rawId);
      if (!wasSaved) captureEvent("blog_saved", { blog_id: rawId });
    } catch {
      toggleSaved(rawId);
      toast.error("Couldn't save this post. Try again.");
    } finally {
      setSaveBusy(false);
    }
  };

  return {
    canInteract,
    liked,
    saved,
    likesCount,
    likeBusy,
    saveBusy,
    toggleLike,
    toggleSave,
  };
}
