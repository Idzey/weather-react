import Skeleton from "../../../shared/ui/skeleton";

export function DaysForecastBlockSkeleton() {
  return (
    <div className="flex-3 flex flex-col items-center bg-primary gap-6 py-4 px-4 lg:px-8 rounded-4xl shadow-3xl">
      <Skeleton className="w-60 h-10" />

      <div className="w-full flex flex-col gap-4">
        {[1, 2, 3].map((item) => (
          <DayForecastItemSkeleton key={item} />
        ))}
      </div>
    </div>
  );
}

function DayForecastItemSkeleton() {
  return (
    <div className="w-full flex items-center text-lg lg:text-3xl gap-1 lg:gap-6">
      <div className="w-16 flex-shrink-0 flex justify-center">
        <Skeleton className="w-15 aspect-square" />
      </div>
      <Skeleton className="w-20 h-6 flex-shrink-0 text-nowrap text-center" />
      <Skeleton className="flex-1 h-6 text-center lg:text-nowrap" />
    </div>
  );
}
