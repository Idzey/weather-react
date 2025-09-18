import dayjs from "../../../shared/date/dayjs";
import { useClockBlock } from "../model/useClockBlock";
import { ClockBlockSkeleton } from "./ClockBlockSkeleton";

export default function ClockBlock() {
  const { weather, time, isError, isLoading } = useClockBlock();

  if (isLoading || isError || !weather) {
    return ClockBlockSkeleton();
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center lg:justify-between bg-primary gap-6 py-6 px-4 lg:py-10 lg:px-30 rounded-4xl shadow-3xl">
      <p className="text-4xl font-bold">{weather?.location.name}</p>

      <div className="flex flex-col items-center">
        <p className="text-8xl font-bold">{dayjs(time).format("HH:mm")}</p>
        <p className="font-normal">{dayjs(time).format("dddd, DD MMM")}</p>
      </div>
    </div>
  );
}
