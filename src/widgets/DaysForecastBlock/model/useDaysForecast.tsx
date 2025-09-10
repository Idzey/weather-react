import { useGetForecastQuery } from "../../../entities/weather/api/weatherApi";
import { useAppSelector } from "../../../shared/hooks/redux";

export function useDaysForecast() {
  const city = useAppSelector((state) => state.location.city);
  const { data: forecast, isLoading, isError } = useGetForecastQuery({ city });
  
  return { forecast, isLoading, isError };
}
