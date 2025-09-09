import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(initReactI18next)
.use(LanguageDetector)
.init({
  resources: {
    en: {
      translation: {
        home: {
            actions: {
                searchPlaceholder: "Search for a city...",
                darkMode: "Dark Mode",
                currentLocation: "Current Location",
                noResultsFound: "No results found"
            },
            weather: {
                feelsLike: "Feels like",
                sunrise: "Sunrise",
                sunset: "Sunset",
                windSpeed: "Wind Speed",
                humidity: "Humidity",
                pressure: "Pressure",
                precipitation: "Precipitation",
                speed: "km/h",
                length: "mm",
                humidityPercent: "hPa"
            },
            daysForecastTitle: "3-Day Forecast",
            hourForecastTitle: "Hourly Forecast",
        }
      }
    },
    ru: {
      translation: {
        home: {
            actions: {
                searchPlaceholder: "Найти город...",
                darkMode: "Темный режим",
                currentLocation: "Текущее местоположение",
                noResultsFound: "Результаты не найдены"
            },
            weather: {
                feelsLike: "Ощущается как",
                sunrise: "Восход",
                sunset: "Закат",
                windSpeed: "Скорость ветра",
                humidity: "Влажность",
                pressure: "Давление",
                precipitation: "Осадки",
                speed: "км/ч",
                length: "мм",
                humidityPercent: "мм рт. ст."
            },
            daysForecastTitle: "3-дневный прогноз",
            hourForecastTitle: "Почасовой прогноз",
        }
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;