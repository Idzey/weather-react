import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetForecastQuery } from "../../../entities/weather/api/weatherApi";
import { useAppSelector } from "../../../shared/lib/hooks/redux";

export function useHourForecastBlock() {
  const city = useAppSelector((state) => state.location.city);
  const { data: forecast, isLoading, isError } = useGetForecastQuery({ city });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { t } = useTranslation();

  const hours = forecast?.forecast.forecastday[0]?.hour || [];

  const hoursForecast = [];
  for (let i = 0; i < 24; i += 2) {
    hoursForecast.push(hours[i]);
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.45;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.45;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  return {
    forecast,
    isLoading,
    isError,
    hoursForecast,
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    handleScroll,
    t,
  };
}
