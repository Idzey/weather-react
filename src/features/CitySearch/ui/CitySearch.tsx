import { useCitySearch } from "../model/useCitySearch";
import { Search } from "lucide-react";
import Input from "../../../shared/ui/input";

export default function CitySearch() {
  const {
    value,
    setValue,
    setIsFocused,
    searchRef,
    t,
    cities,
    isLoading,
    isTyping,
    showResults,
    handleChangeCity,
    isFocused
  } = useCitySearch();

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

      <ResultsBlock 
        cities={cities || []}
        isLoading={isLoading}
        isTyping={isTyping}
        showResults={showResults}
        handleChangeCity={handleChangeCity}
        t={t}
        isFocused={isFocused}
      />
    </div>
  );
}

function ResultsBlock({
  cities,
  isLoading,
  isTyping,
  showResults,
  handleChangeCity,
  t,
  isFocused
}: {
  cities: { name: string; country: string }[];
  isLoading: boolean;
  isTyping: boolean;
  showResults: boolean;
  handleChangeCity: (city: string) => void;
  t: (key: string) => string;
  isFocused: boolean;
}) {
  if (isLoading || isTyping) {
    return (
      <div className="absolute top-1/2 p-10 left-0 w-full bg-card shadow-lg rounded-b-lg z-10">
        {Array.from({ length: 5 }).map((_, index) => (
          <ul key={index} className="flex flex-col gap-4 text-xl mt-4">
            <CityItemSkeleton />
          </ul>
        ))}
      </div>
    );
  }

  return (
    <>
      {isFocused && showResults && (
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
    </>
  );
}

function CityItem({
  name,
  country,
  onClick,
}: {
  name: string;
  country: string;
  onClick: () => void;
}) {
  return (
    <li
      className="text-secondary cursor-pointer hover:text-text"
      onClick={onClick}
    >
      {name}, {country}
    </li>
  );
}

function CityItemSkeleton() {
  return <li className="h-6 w-1/2 bg-secondary/20 rounded animate-pulse"></li>;
}
