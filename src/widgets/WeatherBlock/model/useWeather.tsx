import { useTranslation } from "react-i18next";
import { useGetCurrentWeatherQuery, useGetForecastQuery } from "../../../entities/weather/api/weatherApi";
import { useAppSelector } from "../../../shared/lib/hooks/redux";

export function useWeather() {
  const city = useAppSelector((state) => state.location.city);
  const {
    data: weather,
    isLoading,
    isError,
  } = useGetCurrentWeatherQuery({ city });
  const { data: forecast } = useGetForecastQuery({ city });
  const { t } = useTranslation();

  return {
    weather,
    forecast,
    isLoading,
    isError,
    t,
  };
}
