import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "../../../shared/ui/button";
import { useLanguageSelector } from "../model/useLanguageSelector";

export default function LanguageSelector() {
  const {
    isOpen,
    setIsOpen,
    lang,
    languages: Languages,
    selectRef,
    handleChangeLanguage,
  } = useLanguageSelector();

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
          {Languages.map((lang) => (
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
