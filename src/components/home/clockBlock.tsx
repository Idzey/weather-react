import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useGetCurrentWeatherQuery } from "../../store/weatherApi";
import dayjs from "../../utils/dayjs";
import Skeleton from "../ui/skeleton";

export default function ClockBlock() {
  const city = useAppSelector((state) => state.location.city);
  const { data: weather, isLoading, isError } = useGetCurrentWeatherQuery({ city });
  const [time, setTime] = useState(weather?.location.localtime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs(time).add(1, "second").format());
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  if (isLoading || isError || !weather) {
    return clockBlockSkeleton();
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

function clockBlockSkeleton() {
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