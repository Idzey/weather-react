import { LocateFixed } from "lucide-react";
import Button from "../../../shared/ui/button";
import { useTranslation } from "react-i18next";
import geolocationManager from "../../../shared/geolocation/geolocationManager";
import type { ILocation } from "../../../entities/weather/model/location";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../shared/hooks/redux";
import { useFindCityByCoordsQuery } from "../../../entities/weather/api/weatherApi";
import { setCity } from "../../../shared/model/locationSlice";

export default function LocationDetector() {
  const { t } = useTranslation();
  const [location, setLocation] = useState<ILocation | null>(null);
  const dispatch = useAppDispatch();

  const handleCurrnetLocation = async () => {
    const { latitude, longitude } =
      (await geolocationManager.getCurrentLocation()) as ILocation;
    console.log(latitude, longitude);
    setLocation({ latitude, longitude });
  };

  const handleSetCity = useCallback(
    (city: string) => dispatch(setCity(city)),
    [dispatch]
  );

  const { data: cities } = useFindCityByCoordsQuery({
    lat: location?.latitude ?? "",
    lon: location?.longitude ?? "",
  });

  useEffect(() => {
    if (cities && cities.length > 0) {
      handleSetCity(cities[0].name);
    }
  }, [cities, handleSetCity]);

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
