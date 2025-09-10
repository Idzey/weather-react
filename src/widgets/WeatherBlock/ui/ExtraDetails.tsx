import { CloudRainWind, Gauge, Waves, Wind } from "lucide-react";
import Skeleton from "../../../shared/ui/skeleton";
import { useWeather } from "../model/useWeather";

export function ExtraDetails() {
  const { weather, isLoading, isError, t } = useWeather();

  if (isLoading || isError || !weather) {
    return <ExtraDetailsSkeleton />;
  }

  return (
    <div className="h-full justify-around flex flex-col gap-4">
      <div className="flex justify-around gap-6">
        <ExtraDetailItem
          icon={<Waves size={60} />}
          value={`${weather?.current.humidity || 0}%`}
          label={t("home.weather.humidity")}
        />
        <ExtraDetailItem
          icon={<Wind size={60} />}
          value={`${Math.floor(weather?.current.wind_kph || 0)}${t(
            "home.weather.speed"
          )}`}
          label={t("home.weather.windSpeed")}
        />
      </div>
      <div className="flex justify-around gap-4">
        <ExtraDetailItem
          icon={<Gauge size={60} />}
          value={`${Math.floor(weather?.current.pressure_mb || 0)}${t(
            "home.weather.humidityPercent"
          )}`}
          label={t("home.weather.pressure")}
        />
        <ExtraDetailItem
          icon={<CloudRainWind size={60} />}
          value={`${Math.floor(weather?.current.precip_mm || 0)}${t(
            "home.weather.length"
          )}`}
          label={t("home.weather.precipitation")}
        />
      </div>
    </div>
  );
}

function ExtraDetailItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      {icon}
      <div className="flex flex-col items-center gap-1">
        <p className="font-semibold text-xl whitespace-nowrap">{value}</p>
        <p className="whitespace-nowrap font-medium text-md">{label}</p>
      </div>
    </div>
  );
}

function ExtraDetailsSkeleton() {
  return (
    <div className="h-full justify-around flex flex-col gap-4 w-64">
      <div className="flex justify-around gap-6">
        <ExtraDetailItemSkeleton />
        <ExtraDetailItemSkeleton />
      </div>
      <div className="flex justify-around gap-4">
        <ExtraDetailItemSkeleton />
        <ExtraDetailItemSkeleton />
      </div>
    </div>
  );
}

function ExtraDetailItemSkeleton() {
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-20 h-5" />
      </div>
    </div>
  );
}
