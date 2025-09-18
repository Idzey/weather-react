import Skeleton from "../../../shared/ui/skeleton";

export function HourForecastSkeleton() {
  return (
    <div className="flex-6 flex flex-col bg-primary gap-6 py-4 items-center lg:px-10 rounded-4xl shadow-3xl min-w-0">
      <Skeleton className="w-48 h-8 mb-2" />
      <div className="flex-1 w-full flex justify-center items-center gap-1 min-w-0">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="h-full flex-1 flex gap-6 px-3 overflow-x-auto min-w-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <HourForecastItemSkeleton key={i} />
          ))}
        </div>
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
    </div>
  );
}

function HourForecastItemSkeleton() {
  return (
    <div className="w-20 md:w-28 flex-shrink-0 flex flex-col items-center justify-around h-full gap-1 bg-card rounded-3xl p-2 font-bold">
      <Skeleton className="w-12 h-6 mb-1" />
      <Skeleton className="w-16 h-16 rounded-xl mb-1" />
      <Skeleton className="w-12 h-6 mb-1" />
      <Skeleton className="w-8 h-8 rounded-full mb-1" />
      <Skeleton className="w-10 h-4" />
    </div>
  );
}
