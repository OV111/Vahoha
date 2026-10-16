// NavLink matches on pathname only, so a hash link like "/#how-it-works"
// would show as active on every visit to "/". Hash links compare the full
// path + hash instead; everything else keeps NavLink's own answer.
export const isNavLinkActive = (to, { pathname, hash }, isActive) =>
  to.includes("#") ? `${pathname}${hash}` === to : isActive;

const isUnder = (pathname, path) => pathname === path || pathname.startsWith(`${path}/`);

/** The path an item claims for "active": its `match` if set, else its `to`. */
export const navItemPath = ({ to, match }) => match ?? to;

/**
 * The single active path across a whole menu: the longest one the current URL
 * sits under. Two items can link to the same page (Tests links to /roadmaps
 * because tests are taken from there), and without one winner both, and both
 * their groups, would light up at once. Locked items never win.
 */
export const findActiveNavPath = (pathname, items) =>
  items.reduce((best, item) => {
    const path = navItemPath(item);
    if (item.locked || !isUnder(pathname, path)) return best;
    return !best || path.length > best.length ? path : best;
  }, null);
