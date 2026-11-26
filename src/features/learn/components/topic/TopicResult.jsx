/** What the answers so far say: right, weak ideas, and confident mistakes. */
export default function TopicResult({ session }) {
  if (session.answeredCount === 0)
    return <p className="text-[13px] leading-relaxed text-neutral-400">Answer the questions as you read to see your result here.</p>;

  return (
    <div className="text-[13px] leading-relaxed">
      <p className="font-semibold text-white">Your result</p>
      <p className="mt-1 text-neutral-200">
        {session.rightCount} of {session.answeredCount} right
        {session.answeredCount < session.total && `, ${session.total - session.answeredCount} left`}
      </p>
      {session.sureButWrong > 0 && (
        <p className="mt-1 text-amber-200">
          Sure but wrong: {session.sureButWrong}
        </p>
      )}
      {session.weakIdeas.length > 0 && (
        <>
          <p className="mt-3 font-medium text-white">Read again</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-neutral-300">
            {session.weakIdeas.map((idea) => (
              <li key={idea.id}>{idea.text}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
