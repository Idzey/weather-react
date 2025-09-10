import {
  CloudRainWind,
  Gauge,
  Sunrise,
  Sunset,
  Waves,
  Wind,
} from "lucide-react";
import type React from "react";
import { useAppSelector } from "../../hooks/redux";
import {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
} from "../../store/weatherApi";
import { useTranslation } from "react-i18next";
import Skeleton from "../ui/skeleton";

export default function WeatherBlock() {
  return (
    <div className="flex-3 flex flex-col lg:flex-row justify-between items-center bg-primary gap-4 py-4 px-4 lg:gap-10 lg:px-10 rounded-4xl shadow-3xl">
      <MainDetails />
      <WeatherIcon />
      <ExtraDetails />
    </div>
  );
}

function MainDetails() {
  const city = useAppSelector((state) => state.location.city);
  const {
    data: weather,
    isLoading,
    isError,
  } = useGetCurrentWeatherQuery({ city });
  const { data: forecast } = useGetForecastQuery({ city });
  const { t } = useTranslation();

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

function WeatherIcon() {
  const city = useAppSelector((state) => state.location.city);
  const {
    data: weather,
    isLoading,
    isError,
  } = useGetCurrentWeatherQuery({ city });

    if (isLoading || isError || !weather) {
        return (
            <WeatherIconSkeleton />
        );
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

function ExtraDetails() {
  const city = useAppSelector((state) => state.location.city);
  const {
    data: weather,
    isLoading,
    isError,
  } = useGetCurrentWeatherQuery({ city });
  const { t } = useTranslation();

    if (isLoading || isError || !weather) {
        return (
            <ExtraDetailsSkeleton />
        );
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

function WeatherIconSkeleton() {
  return (
    <div className="h-full flex flex-col items-center justify-between w-44">
      <Skeleton className="w-32 h-32 rounded-full mb-2" />
      <Skeleton className="w-28 h-8" />
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
