import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pl from "./locales/pl/translation.json";
import en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";
import fr from "./locales/fr/translation.json";
import es from "./locales/es/translation.json";
import it from "./locales/it/translation.json";
import ua from "./locales/ua/translation.json";
const savedLang = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  resources: {
    pl: { translation: pl },
    en: { translation: en },
    fr: { translation: fr },
    it: { translation: it },
    ua: { translation: ua },
    es: { translation: es },
    de: { translation: de },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;