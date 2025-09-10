import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { setLang } from "../../../shared/model/settingsSlice";
import dayjs from "../../../shared/date/dayjs";

export function useLanguageSelector() {
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

  return {
    isOpen,
    setIsOpen,
    lang,
    languages,
    selectRef,
    handleChangeLanguage,
  }
}
