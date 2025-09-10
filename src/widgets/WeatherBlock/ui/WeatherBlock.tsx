import { ExtraDetails } from "./ExtraDetails";
import { MainDetails } from "./MainDetails";
import { WeatherIcon } from "./WeatherIcon";

export default function WeatherBlock() {
  return (
    <div className="flex-3 flex flex-col lg:flex-row justify-between items-center bg-primary gap-4 py-4 px-4 lg:gap-10 lg:px-10 rounded-4xl shadow-3xl">
      <MainDetails />
      <WeatherIcon />
      <ExtraDetails />
    </div>
  );
}