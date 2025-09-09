import { ChevronDown, ChevronUp, LocateFixed, Search } from "lucide-react";
import Button from "../ui/button";
import Switch from "../ui/switch";
import { useEffect, useRef, useState, useCallback } from "react";
import Input from "../ui/input";
import {
  useFindCityByCoordsQuery,
  useFindCityQuery,
} from "../../store/weatherApi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCity } from "../../store/locationSlice";
import geolocationManager from "../../utils/geolocationManager";
import type { ILocation } from "../../types/location";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import dayjs from "../../utils/dayjs";
import { setLang, setTheme } from "../../store/settingsSlice";

export default function ActionsBlock() {
  const [location, setLocation] = useState<ILocation | null>(null);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.settings.theme === "dark");
  const setIsDarkMode = (theme: string) => dispatch(setTheme(theme));
  const handleSetTheme = (isDark: boolean) => {
    const theme = isDark ? "dark" : "light";
    setIsDarkMode(theme);
  };
  const handleSetCity = useCallback(
    (city: string) => dispatch(setCity(city)),
    [dispatch]
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const handleCurrnetLocation = async () => {
    const { latitude, longitude } =
      (await geolocationManager.getCurrentLocation()) as ILocation;
    console.log(latitude, longitude);
    setLocation({ latitude, longitude });
  };

  const { data: cities } = useFindCityByCoordsQuery({
    lat: location?.latitude ?? "",
    lon: location?.longitude ?? "",
  });

  useEffect(() => {
    if (cities && cities.length > 0) {
      handleSetCity(cities[0].name);
    }
  }, [cities, handleSetCity]);

  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center gap-4 md:gap-20">
      <div className="flex flex-col items-center gap-2 text-secondary font-extrabold">
        <Switch value={isDarkMode} onChange={handleSetTheme} />
        <p className="whitespace-nowrap">{t("home.actions.darkMode")}</p>
      </div>
      <SearchBlock />
      <Button
        className="flex items-center justify-center rounded-full gap-2 text-lg bg-green text-white"
        onClick={handleCurrnetLocation}
      >
        <LocateFixed size={30} className="text-black" />
        <p className="whitespace-nowrap hidden lg:block">
          {t("home.actions.currentLocation")}
        </p>
      </Button>
      <SelectLanguage />
    </div>
  );
}

function SelectLanguage() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = useAppSelector((state) => state.settings.lang);
  const dispatch = useAppDispatch();
  const handleSetLang = useCallback(
    (lang: string) => dispatch(setLang(lang)),
    [dispatch]
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const languages = ["en", "ru"];

  useEffect(() => {
    dayjs.locale(lang);
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const handleChangeLanguage = (lang: string) => {
    handleSetLang(lang);

    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative z-50">
      <Button
        variant="none"
        className="flex items-center h-fit justify-center p-2 px-4 rounded-lg shadow-lg gap-2 bg-card"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-lg text-secondary font-bold">
          {lang.toUpperCase()}
        </span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {isOpen && (
        <ul className="flex flex-col gap-2 text-lg absolute top-full left-0 w-full bg-card rounded-b-lg p-4 shadow-lg z-50">
          {languages.map((lang) => (
            <SelectLanguageItem
              key={lang}
              lang={lang}
              onClick={() => handleChangeLanguage(lang)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function SelectLanguageItem({
  lang,
  onClick,
}: {
  lang: string;
  onClick: () => void;
}) {
  return (
    <li
      className="text-secondary cursor-pointer hover:text-text"
      onClick={onClick}
    >
      {lang.toUpperCase()}
    </li>
  );
}

function SearchBlock() {
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const {
    data: cities,
    isLoading,
    isError,
  } = useFindCityQuery({ name: value });

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cities && !isLoading && value.length > 0 && isFocused) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [cities, isLoading, value, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dispatch = useAppDispatch();

  const handleChangeCity = (city: string) => {
    setValue(city);
    setShowResults(false);
    setIsFocused(false);
    setIsTyping(false);
    dispatch(setCity(city));
  };

  return (
    <div ref={searchRef} className="relative w-full h-full">
      <div className="relative w-full h-full py-1 bg-primary rounded-full z-50">
        <Search
          size={30}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
        />
        <Input
          placeholder={t("home.actions.searchPlaceholder")}
          value={value}
          onChange={setValue}
          onFocus={() => setIsFocused(true)}
          className="w-full h-full px-14 border-0 z-20"
        />
      </div>

      {showResults && (
        <div className="absolute top-1/2 p-10 left-0 w-full bg-card shadow-lg rounded-b-lg z-10">
          {Array.isArray(cities) && cities.length > 0 ? (
            <ul className="flex flex-col gap-4 text-xl mt-4">
              {cities.map((city, index) => (
                <CityItem
                  key={index}
                  name={city.name}
                  country={city.country}
                  onClick={() => handleChangeCity(city.name)}
                />
              ))}
            </ul>
          ) : (
            <p className="text-secondary text-xl text-center mt-4">
              {t("home.actions.noResultsFound")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const CityItem = ({
  name,
  country,
  onClick,
}: {
  name: string;
  country: string;
  onClick: () => void;
}) => {
  return (
    <li
      className="text-secondary cursor-pointer hover:text-text"
      onClick={onClick}
    >
      {name}, {country}
    </li>
  );
};
