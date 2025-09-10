import { useEffect, useRef, useState } from "react";
import { useFindCityQuery } from "../../../entities/weather/api/weatherApi";
import { useAppDispatch } from "../../../shared/hooks/redux";
import { setCity } from "../../../shared/model/locationSlice";

export function useCitySearch() {
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

  return {
    value,
    setValue,
    isTyping,
    setIsTyping,
    showResults,
    isFocused,
    setIsFocused,
    cities,
    isLoading,
    isError,
    searchRef,
    handleChangeCity,
  };
}
