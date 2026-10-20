// Arrow-key movement between roadmap nodes, on top of normal Tab order.
// Every focusable node carries `data-tree-node`; arrows move to the next or
// previous one in document order (left topics, layer button, right topics,
// then the next layer). Menus stop propagation, so their arrows stay local.
const STEP = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

/** onKeyDown for the tree container. */
export const handleTreeArrowKeys = (e) => {
  const step = STEP[e.key];
  if (!step || e.altKey || e.ctrlKey || e.metaKey) return;
  const nodes = [...e.currentTarget.querySelectorAll("[data-tree-node]")];
  const i = nodes.indexOf(document.activeElement);
  if (i === -1) return;
  const next = nodes[i + step];
  if (!next) return;
  e.preventDefault();
  next.focus();
  next.scrollIntoView?.({ block: "nearest", inline: "nearest" });
};
