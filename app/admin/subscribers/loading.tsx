export default function SubscribersLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <div className="h-7 w-36 bg-slate-200 rounded-lg" />
          <div className="h-4 w-24 bg-slate-100 rounded" />
        </div>
        <div className="h-10 w-40 bg-slate-200 rounded-lg" />
      </div>
      <div className="bg-white rounded-xl ring-1 ring-slate-200 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-slate-100 last:border-0">
            <div className="space-y-1.5">
              <div className="h-4 w-52 bg-slate-100 rounded" />
              <div className="h-3 w-28 bg-slate-100 rounded" />
            </div>
            <div className="h-7 w-14 bg-slate-100 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
