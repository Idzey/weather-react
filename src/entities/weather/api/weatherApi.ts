import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IWeather } from "../model/weather";
import type { IForecast } from "../model/forecast";
import type { ICityLocation } from "../model/cityLocation";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_API_URL = import.meta.env.VITE_WEATHER_API_URL;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (build) => ({
    getCurrentWeather: build.query<IWeather, { lat?: string; lon?: string; city?: string }>({
      query: ({ lat, lon, city }) =>
        `/current.json?key=${API_KEY}&q=${city ? city : `${lat},${lon}`}`,
    }),
    getForecast: build.query<IForecast, { lat?: string; lon?: string; city?: string }>({
      query: ({ lat, lon, city }) =>
        `/forecast.json?key=${API_KEY}&q=${city ? city : `${lat},${lon}`}&days=5`,
    }),
    findCity: build.query<ICityLocation[] | 0, { name: string }>({
      query: ({ name }) => `/search.json?key=${API_KEY}&q=${name}`,
    }),
    findCityByCoords: build.query<ICityLocation[] | 0, { lat: string; lon: string }>({
      query: ({ lat, lon }) => `/search.json?key=${API_KEY}&q=${lat},${lon}`,
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useGetForecastQuery, useFindCityQuery, useFindCityByCoordsQuery } = weatherApi;
