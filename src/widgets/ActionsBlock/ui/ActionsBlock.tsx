import CitySearch from "../../../features/CitySearch/ui/CitySearch";
import LanguageSelector from "../../../features/LanguageSelector/ui/LanguageSelector";
import LocationDetector from "../../../features/LocationDetector/ui/LocationDetector";
import ThemeToggle from "../../../features/ThemeToggle/ui/ThemeToggle";

export default function ActionsBlock() {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-20">
      <div className="hidden lg:block">
        <ThemeToggle />
      </div>

      <CitySearch />

      <LocationDetector />

      <div className="hidden lg:block">
        <LanguageSelector />
      </div>
    </div>
  );
}
