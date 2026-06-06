export default function ProjectsLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <div className="h-7 w-28 bg-slate-200 rounded-lg" />
          <div className="h-4 w-20 bg-slate-100 rounded" />
        </div>
        <div className="h-10 w-32 bg-slate-200 rounded-lg" />
      </div>
      <div className="bg-white rounded-xl ring-1 ring-slate-200 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-100 last:border-0">
            <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-slate-100 rounded" />
              <div className="h-3 w-32 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
