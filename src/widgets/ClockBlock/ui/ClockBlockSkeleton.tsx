import Skeleton from "../../../shared/ui/skeleton";

export function ClockBlockSkeleton() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center lg:justify-between bg-primary gap-6 py-6 px-4 lg:py-10 lg:px-30 rounded-4xl shadow-3xl">
      <Skeleton className="w-50 h-10" />

      <div className="flex flex-col items-center gap-4">
        <Skeleton className="w-50 h-20" />
        <Skeleton className="w-42 h-6" />
      </div>
    </div>
  );
}
