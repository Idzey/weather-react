import { useCallback, useEffect, useState } from "react";
import { useFindCityByCoordsQuery } from "../../../entities/weather/api/weatherApi";
import { setCity } from "../../../shared/model/locationSlice";
import geolocationManager from "../../../shared/geolocation/geolocationManager";
import { useAppDispatch } from "../../../shared/lib/hooks/redux";
import type { ILocation } from "../../../entities/weather/model/location";
import { useTranslation } from "react-i18next";

export function useLocationDetector() {
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

  return { t, handleCurrnetLocation };
}
