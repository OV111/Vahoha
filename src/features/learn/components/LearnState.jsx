import NotFound from "@/components/feedback/NotFound";
import { ArticleSkeleton, LayerSkeleton, LessonSkeleton } from "./LearnSkeletons";

const SKELETONS = { layer: LayerSkeleton, lesson: LessonSkeleton, article: ArticleSkeleton };

// One place for the non-happy states so both learn pages behave the same.
// `variant` picks the loading placeholder that matches the page being loaded.
export default function LearnState({ status, variant = "layer" }) {
  if (status === "loading") {
    const Skeleton = SKELETONS[variant];
    return <Skeleton />;
  }
  if (status === "error") {
    return (
      <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-neutral-400">
        This track didn&apos;t load. Check your connection and refresh the page.
      </p>
    );
  }
  return <NotFound />;
}
