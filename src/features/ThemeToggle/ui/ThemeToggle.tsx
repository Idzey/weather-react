import { useTranslation } from "react-i18next";
import Switch from "../../../shared/ui/switch";
import { useThemeToggle } from "../model/useThemeToggle";

export default function ThemeToggle() {
  const { t } = useTranslation();
  const { handleSetTheme, isDarkMode } = useThemeToggle();

  return (
    <div className="hidden lg:flex flex-col items-center gap-2 text-secondary font-extrabold">
      <Switch value={isDarkMode} onChange={handleSetTheme} />
      <p className="whitespace-nowrap">
        {isDarkMode ? t("home.actions.darkMode") : t("home.actions.lightMode")}
      </p>
    </div>
  );
}
