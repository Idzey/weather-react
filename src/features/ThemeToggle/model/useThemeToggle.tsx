import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { setTheme } from "../../../shared/model/settingsSlice";

export function useThemeToggle() {
  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.settings.theme === "dark");
  const setIsDarkMode = (theme: string) => dispatch(setTheme(theme));

  const handleSetTheme = (isDark: boolean) => {
    const theme = isDark ? "dark" : "light";
    setIsDarkMode(theme);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return {
    handleSetTheme,
    isDarkMode,
  };
}
