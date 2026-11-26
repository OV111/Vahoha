import { Bone, BonePanel, SkeletonRegion } from "@/components/feedback/Skeleton";

// Mirrors the real chat layout (right-aligned user bubbles, full-width agent
// blocks), so the transcript doesn't jump when content lands.
const UserBubble = ({ width }) => (
  <div className="flex justify-end">
    <BonePanel className={`rounded-2xl rounded-br-md px-4 py-3 ${width}`}>
      <Bone className="h-3.5" />
    </BonePanel>
  </div>
);

const AgentBlock = ({ widths }) => (
  <div className="space-y-2">
    {widths.map((width, i) => (
      <Bone key={i} className={`h-3.5 ${width}`} />
    ))}
  </div>
);

export default function MessageSkeleton() {
  return (
    <SkeletonRegion label="Loading conversation" className="space-y-6">
      <UserBubble width="w-[45%]" />
      <AgentBlock widths={["w-[92%]", "w-[85%]", "w-[60%]"]} />
      <UserBubble width="w-[30%]" />
      <AgentBlock widths={["w-[88%]", "w-[70%]"]} />
    </SkeletonRegion>
  );
}
