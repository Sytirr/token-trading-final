'use client'
export default function SkeletonRow() {
  return (
    <div className="grid md:grid-cols-12 grid-cols-1 gap-4 px-4 py-3 table-row border-b border-slate-700">
      <div className="md:col-span-4 flex items-center gap-3">
        <div className="avatar-skeleton skeleton" />
        <div className="w-40 h-4 skeleton rounded" />
      </div>
      <div className="md:col-span-2 flex items-center justify-end">
        <div className="w-24 h-4 skeleton rounded" />
      </div>
      <div className="md:col-span-2 flex items-center justify-end">
        <div className="w-16 h-4 skeleton rounded" />
      </div>
      <div className="md:col-span-3 flex items-center justify-end">
        <div className="w-32 h-4 skeleton rounded" />
      </div>
      <div className="md:col-span-1 flex items-center justify-end">
        <div className="w-12 h-8 skeleton rounded" />
      </div>
    </div>
  )
}
