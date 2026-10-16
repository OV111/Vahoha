import NotFound from "@/components/feedback/NotFound";

// One place for the non-happy states so both learn pages behave the same.
export default function LearnState({ status }) {
  if (status === "loading") {
    return <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-neutral-500">Loading…</p>;
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
