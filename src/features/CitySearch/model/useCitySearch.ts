import { useEffect, useRef, useState } from "react";
import { useFindCityQuery } from "../../../entities/weather/api/weatherApi";
import { setCity } from "../../../shared/model/locationSlice";
import { useAppDispatch } from "../../../shared/lib/hooks/redux";
import { useTranslation } from "react-i18next";

export function useCitySearch() {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const {
    data: cities,
    isLoading,
    isError,
  } = useFindCityQuery({ name: debouncedValue }, { skip: !debouncedValue || !isFocused });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  const isTyping = debouncedValue != value;

  const searchRef = useRef<HTMLDivElement>(null);

  const showResults = (!!cities && value.length > 0 && isFocused) as boolean;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dispatch = useAppDispatch();

  const handleChangeCity = (city: string) => {
    setValue("");
    setValue(city);
    setIsFocused(false);
    dispatch(setCity(city));
  };

  const { t } = useTranslation();

  return {
    value,
    setValue,
    isTyping,
    showResults,
    isFocused,
    setIsFocused,
    cities,
    isLoading,
    isError,
    searchRef,
    handleChangeCity,
    t,
  };
}
