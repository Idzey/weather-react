import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useGetCurrentWeatherQuery } from "../../store/weatherApi";
import dayjs from "../../utils/dayjs";

export default function ClockBlock() {
  const city = useAppSelector((state) => state.location.city);
  const { data: weather, isLoading, isError } = useGetCurrentWeatherQuery({ city });
  const [time, setTime] = useState(weather?.location.localtime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().toString());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-between bg-primary gap-6 py-6 px-4 lg:py-10 lg:px-30 rounded-4xl shadow-3xl">
        <p className="text-4xl font-bold">{weather?.location.name}</p>

        <div className="flex flex-col items-center">
            <p className="text-8xl font-bold">{dayjs(time).format("HH:mm")}</p>
            <p className="font-normal">{dayjs(time).format("dddd, DD MMM")}</p>
        </div>
    </div>
  );
}