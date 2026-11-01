/** One incoming message request: opens the conversation, or accept/decline. */
const RequestRow = ({ request, onOpen, onAccept, onDecline }) => {
  const name = `${request.user.firstName} ${request.user.lastName}`.trim();

  return (
    <div className="border-b border-white/5 px-3 py-3">
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-purple-500"
      >
        {request.user.stats?.profileImage ? (
          <img src={request.user.stats.profileImage} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" />
        ) : (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fuchsia-950/40 text-fuchsia-300">
            {name[0]?.toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-100">{name}</p>
          <p className="truncate text-xs text-[#8A8A93]">{request.preview}</p>
        </div>
      </button>
      <div className="mt-2 flex gap-2 pl-11">
        <button
          type="button"
          onClick={onAccept}
          className="cursor-pointer rounded-lg bg-purple-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-purple-500"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={onDecline}
          className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default RequestRow;
