import { useEffect, useState } from "react";
import { toast } from "sonner";
import StatusTabs from "./components/intros/StatusTabs";
import SentIntroRow from "./components/intros/SentIntroRow";
import { fetchSentIntros, withdrawIntro } from "./api/hiringApi";
import { INTROS_PAGE_COPY as COPY } from "../../../constants/hiring";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";

// /hiring/intros: every intro request the company sent, newest first.
const IntrosPage = () => {
  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchSentIntros(filter)
      .then((data) => !cancelled && setRows(data))
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, [filter]);

  const pick = (id) => {
    if (id === filter) return;
    setRows(null);
    setError(null);
    setFilter(id);
  };

  const onWithdraw = async (id) => {
    try {
      const updated = await withdrawIntro(id);
      setRows((list) =>
        filter === "pending" ? list.filter((r) => r.id !== id) : list.map((r) => (r.id === id ? updated : r)),
      );
      toast.success(COPY.withdrawn);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-white">{COPY.title}</h1>
      <p className="mt-1 max-w-2xl text-sm text-neutral-400">{COPY.intro}</p>

      <div className="mt-6">
        <StatusTabs value={filter} onChange={pick} />
      </div>

      {error && <p className="mt-8 text-sm text-red-400">{error}</p>}
      {!rows && !error && <div className="flex min-h-[50vh]"><LoadingSuspense fill /></div>}
      {rows && rows.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-neutral-400">
          {filter ? COPY.emptyFiltered : COPY.empty}
        </p>
      )}
      {rows && rows.length > 0 && (
        <ul className="mt-6 flex flex-col gap-3">
          {rows.map((intro) => <SentIntroRow key={intro.id} intro={intro} onWithdraw={onWithdraw} />)}
        </ul>
      )}
    </div>
  );
};

export default IntrosPage;
