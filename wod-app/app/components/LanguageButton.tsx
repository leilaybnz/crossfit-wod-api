'use client'
import LanguageSVG from "./LanguageSVG";
import styles from "../styles/languageButton.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function LanguageButton() {

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = () => {
    alert('click');
    //const newLanguage = currentLanguage === "en" ? "es" : "en";
    //setCurrentLanguage(newLanguage);
    //changeLanguage(newLanguage);
  };

  return (
    <button
      className={styles.container}
      type="button"
      onClick={() => alert('click')}
    >
      <LanguageSVG />
    </button>
  );
}
