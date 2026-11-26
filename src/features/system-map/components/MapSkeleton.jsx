import { Bone, BonePanel } from "@/components/feedback/Skeleton";
import "@/features/system-map/project-map-theme.css";
import LensPicker from "./LensPicker";
import MapHeader, { CANVAS, PAGE } from "./MapHeader";
import MapToolbar from "./MapToolbar";
import NodePalette from "./NodePalette";
import { DEFAULT_LENS } from "@/features/system-map/lib/lenses";

const NO_HISTORY = { undo: false, redo: false };
const PENDING_MAP = { id: null, shared: false, publicId: null }; // signed in, so the toolbar shows History and Share

// Blocks lying on the floor, at the angle the 3D view opens in.
function CanvasSkeleton() {
  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center">
      <div className="grid grid-cols-3 gap-6 [transform:rotateX(55deg)_rotateZ(45deg)] sm:gap-9">
        {Array.from({ length: 6 }, (_, i) => (
          <BonePanel key={i} className="flex size-16 flex-col justify-center gap-2 px-3 sm:size-24">
            <Bone className="h-3 w-full" />
            <Bone soft className="h-2.5 w-2/3" />
          </BonePanel>
        ))}
      </div>
    </div>
  );
}

/**
 * The page while the editor and the map load. Everything that is the same for
 * every map is the real thing, made inert until the editor can answer a click;
 * only the map itself is a placeholder. No lens is marked active: the map decides.
 */
export default function MapSkeleton({ ownerType }) {
  return (
    <section className={`pm-theme ${PAGE}`} aria-busy="true">
      <div className="flex flex-col gap-4">
        <MapHeader ownerType={ownerType} status="Opening your map…" />
        <div inert>
          <MapToolbar remote={PENDING_MAP} isTeam={ownerType === "team"} view3d history={NO_HISTORY} />
        </div>
      </div>
      <div inert>
        <LensPicker />
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 sm:mt-5 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <div inert>
          <NodePalette lens={DEFAULT_LENS} />
        </div>
        <div className={CANVAS}>
          <CanvasSkeleton />
        </div>
      </div>
    </section>
  );
}
