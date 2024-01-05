import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import esJSON from "./locale/es.json";
import enJSON from "./locale/en.json";

i18n.use(initReactI18next).init({
  resources: {
    es: { ...esJSON },
    en: { ...enJSON },
  },
  lng: "en",
});
