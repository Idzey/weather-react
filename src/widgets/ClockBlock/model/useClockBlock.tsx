import { useEffect, useState } from "react";
import dayjs from "../../../shared/date/dayjs";
import { useGetCurrentWeatherQuery } from "../../../entities/weather/api/weatherApi";
import { useAppSelector } from "../../../shared/lib/hooks/redux";

export function useClockBlock() {
  const city = useAppSelector((state) => state.location.city);
  const {
    data: weather,
    isLoading,
    isError,
  } = useGetCurrentWeatherQuery({ city });
  const [time, setTime] = useState(weather?.location.localtime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs(time).add(1, "second").format());
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);


  return {
    weather,
    time,
    isLoading,
    isError,
  };
}
