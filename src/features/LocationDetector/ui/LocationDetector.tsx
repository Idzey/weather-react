import { LocateFixed } from "lucide-react";
import Button from "../../../shared/ui/button";
import { useLocationDetector } from "../model/useLocationDetector";


export default function LocationDetector() {
  const { t , handleCurrnetLocation } = useLocationDetector();

  return (
    <Button
      className="flex items-center justify-center rounded-full gap-2 text-lg bg-green text-white"
      onClick={handleCurrnetLocation}
    >
      <LocateFixed size={30} className="text-black" />
      <p className="whitespace-nowrap hidden lg:block">
        {t("home.actions.currentLocation")}
      </p>
    </Button>
  );
}
