// A row that scrolls sideways on a small screen: no scrollbar (it showed as a
// bright bar), and a fade on the right edge so it is clear there is more to
// swipe to. The fade only shows where content reaches the edge.
export const SCROLL_ROW =
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,black_calc(100%-28px),transparent)]";
