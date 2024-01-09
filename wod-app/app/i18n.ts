import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import esJSON from "./locale/es.json";
import enJSON from "./locale/en.json";
import i18next from "i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { ...esJSON },
      en: { ...enJSON },
    },
    lng: "en",
  });

  export default i18n;