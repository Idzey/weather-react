import { useAppSelector } from "../../hooks/redux";
import { useGetForecastQuery } from "../../store/weatherApi";
import { useTranslation } from "react-i18next";
import dayjs from "../../utils/dayjs";
import Skeleton from "../ui/skeleton";

export default function DaysForecastBlock() {
  const city = useAppSelector((state) => state.location.city);
  const { data: forecast, isLoading, isError } = useGetForecastQuery({ city });
  const { t } = useTranslation();

  if (isLoading || isError || !forecast) {
    return daysForecastBlockSkeleton();
  }

  return (
    <div className="flex-3 flex flex-col items-center bg-primary gap-6 py-4 px-4 lg:px-8 rounded-4xl shadow-3xl">
      <p className="text-4xl font-bold text-center">{t("home.daysForecastTitle")}:</p>
      <div className="w-full flex flex-col gap-4">
        {
          forecast?.forecast.forecastday.map((day) => (
            <DayForecastItem
              key={day.date_epoch}
              icon={day.day.condition.icon}
              temperature={`${Math.floor(day.day.avgtemp_c)}°C`}
              date={dayjs(day.date).format("dddd, DD MMM")}
            />
          ))
        }
      </div>
    </div>
  );
}

function DayForecastItem({
  icon,
  temperature,
  date,
}: {
  icon: string;
  temperature: string;
  date: string;
}) {
  return (
    <div className="w-full flex items-center text-lg lg:text-3xl gap-1 lg:gap-6">
      <div className="w-16 flex-shrink-0 flex justify-center">
        <img src={icon} alt="date" className="w-15 aspect-square" />
      </div>
      <p className="w-20 flex-shrink-0 text-nowrap text-center">{temperature}</p>
      <p className="flex-1 text-center lg:text-nowrap">{date}</p>
    </div>
  );
}

function daysForecastBlockSkeleton() {
    return (
        <div className="flex-3 flex flex-col items-center bg-primary gap-6 py-4 px-4 lg:px-8 rounded-4xl shadow-3xl">
            <Skeleton className="w-60 h-10" />
            
            <div className="w-full flex flex-col gap-4">
                {[1, 2, 3].map((item) => (
                    <DayForecastItemSkeleton key={item} />
                ))}
            </div>
        </div>
    );
}

function DayForecastItemSkeleton() {
    return (
        <div className="w-full flex items-center text-lg lg:text-3xl gap-1 lg:gap-6">
            <div className="w-16 flex-shrink-0 flex justify-center">
                <Skeleton className="w-15 aspect-square" />
            </div>
            <Skeleton className="w-20 h-6 flex-shrink-0 text-nowrap text-center" />
            <Skeleton className="flex-1 h-6 text-center lg:text-nowrap" />
        </div>
    );
}