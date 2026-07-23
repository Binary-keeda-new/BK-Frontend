export default function ReportSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      {/* Header Skeleton */}
      <div className="mb-6 rounded-3xl  bg-[var(--surface)] p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="w-full max-w-sm animate-pulse space-y-3">
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700"></div>
            <div className="h-8 w-3/4 rounded bg-slate-200 dark:bg-slate-700"></div>
            <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700"></div>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end sm:gap-2">
            <div className="h-6 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700"></div>
            <div className="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
            <div className="mt-1 h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          <div className="col-span-1 grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2 lg:col-span-3 lg:grid-cols-4">
            <div className="flex h-32 flex-col items-center justify-center rounded-2xl  bg-[var(--surface)] p-5">
              <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700"></div>
              <div className="mt-4 h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
              <div className="mt-2 h-6 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
            </div>
          </div>

          <div className="col-span-1 h-96 animate-pulse rounded-3xl  bg-[var(--surface)] shadow-sm"></div>
          <div className="col-span-1 h-96 animate-pulse rounded-3xl  bg-[var(--surface)] shadow-sm"></div>
        </div>
      </div>
    </div>
  );
}
