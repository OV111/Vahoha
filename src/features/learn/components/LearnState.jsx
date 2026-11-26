import NotFound from "@/components/screens/NotFound";
import { ArticleSkeleton, LayerSkeleton } from "./LearnSkeletons";

const SKELETONS = { layer: LayerSkeleton, article: ArticleSkeleton };

// One place for the non-happy states so the learn pages behave the same.
// `variant` picks the loading placeholder that matches the page being loaded.
export default function LearnState({ status, variant = "layer", what = "track" }) {
  if (status === "loading") {
    const Skeleton = SKELETONS[variant];
    return <Skeleton />;
  }
  if (status === "error") {
    return (
      <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-neutral-400">
        This {what} didn&apos;t load. Check your connection and refresh the page.
      </p>
    );
  }
  return <NotFound />;
}
