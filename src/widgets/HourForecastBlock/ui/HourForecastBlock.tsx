import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../../shared/ui/button";
import clsx from "clsx";
import { useHourForecastBlock } from "../model/useHourForecastBlock";
import { HourForecastSkeleton } from "./HourForecastBlockSkeleton";

export default function HourForecastBlock() {
  const {
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
  } = useHourForecastBlock();

  if (isLoading || isError || !forecast) {
    return <HourForecastSkeleton />;
  }

  return (
    <div className="flex-6 flex flex-col bg-primary gap-6 py-4 items-center lg:px-10 rounded-4xl shadow-3xl min-w-0">
      <p className="text-3xl font-bold">{t("home.hourForecastTitle")}:</p>
      <div className="flex-1 w-full flex justify-center items-center gap-1 min-w-0">
        <Button
          size="icon"
          variant="none"
          className="flex-shrink-0"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeft
            size={50}
            className={clsx(
              canScrollLeft ? "text-text" : "text-text/50",
              "transition-all duration-300"
            )}
          />
        </Button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full flex-1 flex gap-6 px-3 overflow-x-auto scrollbar-hide min-w-0"
        >
          {hoursForecast
            .filter((hour) => hour !== undefined && hour !== null)
            .map((hour) => (
              <HourForecastItem
                key={hour.time_epoch}
                time={hour.time.slice(11, 16)}
                icon={hour.condition.icon}
                temperature={`${Math.floor(hour.temp_c)}°C`}
                directionWind={hour.wind_dir}
                speedWind={`${Math.floor(hour.wind_kph)}`}
              />
            ))}
        </div>

        <Button
          size="icon"
          variant="none"
          className="flex-shrink-0"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRight
            size={50}
            className={clsx(
              canScrollRight ? "text-text" : "text-text/50",
              "transition-all duration-300"
            )}
          />
        </Button>
      </div>
    </div>
  );
}

function HourForecastItem({
  time,
  icon,
  temperature,
  directionWind = "N",
  speedWind,
}: {
  time: string;
  temperature: string;
  icon: string;
  directionWind?: string;
  speedWind?: string;
}) {
  return (
    <div className="w-20 md:w-28 flex-shrink-0 flex flex-col items-center text-sm sm:text-lg md:text-xl lg:text-2xl justify-around h-full gap-1 bg-card rounded-3xl p-2 font-bold">
      <p className="text-nowrap">{time}</p>
      <img
        src={icon}
        alt="weather icon"
        className="w-12 sm:w-16 md:w-20 lg:w-24 aspect-square"
      />
      <p className="text-nowrap">{temperature}</p>
      <img
        src="./icons/directionWind.svg"
        alt={directionWind}
        className={`w-6 sm:w-6 md:w-10 ${findDirectionIcon(directionWind)}`}
      />
      <p className="text-xs sm:text-sm md:text-base">{speedWind}km/h</p>
    </div>
  );
}

function findDirectionIcon(direction: string) {
  switch (direction) {
    case "N":
      return "rotate-0";
    case "S":
      return "rotate-180";
    case "E":
      return "rotate-90";
    case "W":
      return "rotate-270";
    default:
      return "rotate-0";
  }
}
