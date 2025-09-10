import Skeleton from "../../../shared/ui/skeleton";
import { useWeather } from "../model/useWeather";

export function WeatherIcon() {
  const { weather, isLoading, isError } = useWeather();

  if (isLoading || isError || !weather) {
    return <WeatherIconSkeleton />;
  }

  return (
    <div className="h-full flex flex-col items-center justify-between">
      <img
        src={weather?.current.condition.icon}
        alt="Sunny"
        className="w-50 aspect-square"
      />
      <p className="text-3xl font-bold">{weather?.current.condition.text}</p>
    </div>
  );
}

function WeatherIconSkeleton() {
  return (
    <div className="h-full flex flex-col items-center justify-between w-44">
      <Skeleton className="w-32 h-32 rounded-full mb-2" />
      <Skeleton className="w-28 h-8" />
    </div>
  );
}
