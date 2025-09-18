import { Sunrise, Sunset } from "lucide-react";
import Skeleton from "../../../shared/ui/skeleton";
import { useWeather } from "../model/useWeather";

export function MainDetails() {
  const { weather, forecast, isLoading, isError, t } = useWeather();

  if (isLoading || isError || !weather || !forecast) {
    return (
        <MainDetailsSkeleton />
    );
  }

  return (
    <div className="flex flex-col justify-between items-center gap-4">
      <div>
        <div className="bg-gradient-to-tr from-text to-text/0 bg-clip-text text-transparent">
          <p className="text-8xl font-bold">
            {Math.floor(weather?.current.temp_c || 42)}°C
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 opacity-70">
          <p className="font-semibold text-xl">
            {t("home.weather.feelsLike")}:
          </p>
          <p className="text-4xl font-bold">
            {Math.floor(weather?.current.feelslike_c || 42)}°C
          </p>
        </div>
      </div>
      <div className="flex flex-row lg:flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Sunrise size={50} />
          <div>
            <p className="text-2xl font-semibold">
              {t("home.weather.sunrise")}
            </p>
            <p className="font-semibold text-xl">
              {forecast?.forecast.forecastday[0].astro.sunrise}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sunset size={50} />
          <div>
            <p className="text-2xl font-semibold">{t("home.weather.sunset")}</p>
            <p className="font-semibold text-xl">
              {forecast?.forecast.forecastday[0].astro.sunset}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainDetailsSkeleton() {
  return (
    <div className="flex flex-col justify-between items-center gap-4 w-60">
      <div>
        <Skeleton className="w-40 h-20 mb-2" />
        <div className="flex items-center justify-center gap-2 opacity-70">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-16 h-10" />
        </div>
      </div>
      <div className="flex flex-row lg:flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div>
            <Skeleton className="w-20 h-6 mb-1" />
            <Skeleton className="w-16 h-6" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div>
            <Skeleton className="w-20 h-6 mb-1" />
            <Skeleton className="w-16 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}