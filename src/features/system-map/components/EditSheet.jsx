import Inspector from "./Inspector";
import PartComments from "./PartComments";

// Below lg it is a sheet pinned to the bottom of the screen (so it is never
// off-screen under a tall canvas); from lg it floats over the canvas, which
// keeps its full width.
export default function EditSheet({ node, edge, repo, lens, onNode, onEdge, onDeleteNode, onDeleteEdge, onClose, comments, savedIds }) {
  return (
    <aside
      aria-label="Edit the selected item"
      className="thin-scrollbar fixed inset-x-0 bottom-0 z-40 max-h-[50svh] overflow-auto rounded-t-2xl border-t border-neutral-700 bg-neutral-950 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl shadow-black lg:absolute lg:inset-x-auto lg:top-3 lg:right-3 lg:bottom-auto lg:z-10 lg:max-h-[calc(100%-1.5rem)] lg:w-72 lg:rounded-2xl lg:border lg:border-neutral-800 lg:bg-neutral-950/95 lg:pb-4 lg:shadow-xl lg:shadow-black/50"
    >
      <Inspector
        node={node}
        edge={edge}
        repo={repo}
        lens={lens}
        onNode={onNode}
        onEdge={onEdge}
        onDeleteNode={onDeleteNode}
        onDeleteEdge={onDeleteEdge}
        onClose={onClose}
        nodeExtra={
          comments.enabled && node ? (
            <PartComments
              key={node.id}
              comments={comments.byNode.get(node.id) ?? []}
              saved={savedIds.has(node.id)}
              onAdd={(text) => comments.add(node.id, text)}
              onDelete={comments.remove}
            />
          ) : null
        }
      />
    </aside>
  );
}
