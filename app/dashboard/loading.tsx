export default function DashboardLoading() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      aria-label="リクエストを読み込んでいます"
      className="bg-slate-200 rounded-xl border border-gray-200 divide-y divide-gray-100 w-[50vw] mt-48"
    >
      <p className="sr-only">リクエストを読み込んでいます...</p>

      {Array.from({ length: 5 }).map((_, i) => {
        const Id = `Skel-${i}`;
        return (
          <div
            key={Id}
            className="px-6 py-8 flex items-center justify-between gap-4 animate-pulse"
            aria-hidden="true"
          >
            {/* Left content skeleton */}
            {/* 左側のコンテンツの骨格 */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>

            {/* Status pill skeleton */}
            {/* ステータスピルの骨格 */}
            <div className="h-6 w-16 bg-gray-100 rounded-full" />
          </div>
        );
      })}
    </section>
  );
}
