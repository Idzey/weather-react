import ActionsBlock from "../components/home/actionsBlock";
import ClockBlock from "../components/home/clockBlock";
import DaysForecastBlock from "../components/home/daysForecastBlock";
import HourForecastBlock from "../components/home/hourForecastBlock";
import WeatherBlock from "../components/home/weatherBlock";

export default function Home() {

  return (
    <div className="flex-1 bg-gradient-to-br from-background-start to-background-end text-text font-poppins font-semibold">
      <div className="flex-1 min-h-screen flex flex-col p-8 px-6 lg:p-8 gap-10 bg-gradient-to-br from-background-start to-background-end">
        <ActionsBlock />

        <div className="flex flex-col md:flex-row gap-10">
          <ClockBlock />
          <WeatherBlock />
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <DaysForecastBlock />
          <HourForecastBlock />
        </div>
      </div>
    </div>
  );
}
