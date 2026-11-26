// Page width + side padding, copied from the pages whose spacing already
// works: dashboard = Roadmap, focused = Capstone. Each page adds its own
// vertical padding.
export const PAGE = {
  dashboard: "mx-auto w-full max-w-[1200px] px-6 sm:px-10",
  focused: "mx-auto w-full max-w-5xl px-6 lg:px-12",
  // Forms read badly wider than this, so they keep Capstone's padding at a narrower width.
  narrow: "mx-auto w-full max-w-3xl px-6 lg:px-12",
};
