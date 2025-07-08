import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setLanguage } from "./languageSlice";
import { DropdownItem, DropdownMenu, DropdownToggle, Flag, Wrapper } from "./styled"

const languages = [
  { code: "pl", name: "Polski", flag: "pl" },
  { code: "en", name: "English", flag: "gb" },
  { code: "de", name: "Deutsch", flag: "de" },
  { code: "fr", name: "Français", flag: "fr" },
  { code: "es", name: "Español", flag: "es" },
  { code: "it", name: "Italiano", flag: "it" },
  { code: "ua", name: "Українська", flag: "ua" },
];

const LanguageSwitcher = () => {
  const dispatch = useAppDispatch();
  const currentLang = useAppSelector((state) => state.language.currentLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLang = languages.find((l) => l.code === currentLang) || languages[0];

  const handleSelect = (lang: string) => {
    dispatch(setLanguage(lang));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper ref={dropdownRef}>
      <DropdownToggle onClick={() => setIsOpen((prev) => !prev)}>
        <Flag className={`fi fi-${selectedLang.flag}`} />
        {selectedLang.name}
      </DropdownToggle>
      <DropdownMenu open={isOpen}>
        {languages.map((lang) => (
          <DropdownItem key={lang.code} onClick={() => handleSelect(lang.code)}>
            <Flag className={`fi fi-${lang.flag}`} />
            {lang.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Wrapper>
  );
};

export default LanguageSwitcher;