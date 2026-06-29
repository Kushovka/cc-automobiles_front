const SkeletonBlock = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />
)

export const VehicleCardSkeleton = () => (
  <div className="flex h-full min-h-[474px] flex-col overflow-hidden rounded-lg border border-blue-950/10 bg-white shadow-sm shadow-blue-950/5">
    <SkeletonBlock className="h-56 w-full rounded-none" />
    <div className="flex flex-1 flex-col p-4">
      <div className="grid min-h-[82px] grid-cols-[1fr_auto] items-start gap-3">
        <div className="min-w-0">
          <SkeletonBlock className="h-6 w-40" />
          <SkeletonBlock className="mt-3 h-4 w-20" />
        </div>
        <SkeletonBlock className="h-6 w-24" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <SkeletonBlock className="h-9" />
        <SkeletonBlock className="h-9" />
      </div>
      <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
        <SkeletonBlock className="h-11" />
        <SkeletonBlock className="h-11" />
      </div>
    </div>
  </div>
)

export const VehicleGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <VehicleCardSkeleton key={index} />
    ))}
  </>
)

export const VehicleDetailSkeleton = () => (
  <section className="section bg-slate-100">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
      <div className="grid gap-3">
        <SkeletonBlock className="aspect-[4/3] w-full rounded-lg" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-20 rounded-lg" />
          ))}
        </div>
      </div>
      <div>
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="mt-4 h-10 w-4/5" />
        <SkeletonBlock className="mt-4 h-10 w-36" />
        <div className="mt-6 grid grid-cols-2 gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="rounded-md border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5">
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="mt-3 h-5 w-28" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <SkeletonBlock className="h-12 w-full sm:w-32" />
          <SkeletonBlock className="h-12 w-full sm:w-36" />
        </div>
        <SkeletonBlock className="mt-6 h-24 w-full" />
      </div>
    </div>
  </section>
)

export const InventoryToolbarSkeleton = () => (
  <div className="mb-5 flex flex-col gap-3 rounded-lg border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 sm:flex-row sm:items-center sm:justify-between">
    <SkeletonBlock className="h-11 w-full sm:w-36 lg:hidden" />
    <SkeletonBlock className="h-5 w-36" />
    <SkeletonBlock className="h-12 w-full sm:w-64" />
  </div>
)
