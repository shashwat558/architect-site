export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="h-8 w-48 bg-slate-200 rounded-lg" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl ring-1 ring-slate-200 p-6 flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 bg-slate-100 rounded" />
              <div className="h-7 w-12 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
