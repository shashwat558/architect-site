export default function ContactLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 space-y-2">
        <div className="h-7 w-48 bg-slate-200 rounded-lg" />
        <div className="h-4 w-28 bg-slate-100 rounded" />
      </div>
      <div className="bg-white rounded-xl ring-1 ring-slate-200 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="px-6 py-5 border-b border-slate-100 last:border-0 space-y-3">
            <div className="flex gap-3">
              <div className="h-5 w-36 bg-slate-100 rounded" />
              <div className="h-5 w-20 bg-slate-100 rounded" />
            </div>
            <div className="h-3 w-48 bg-slate-100 rounded" />
            <div className="h-16 bg-slate-50 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
