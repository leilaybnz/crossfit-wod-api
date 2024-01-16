"use client";
import LanguageSVG from "./LanguageSVG";
import styles from "../styles/languageButton.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function LanguageButton() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = () => {
    // alert("click");
    setIsOpen(!isOpen);
    //const newLanguage = currentLanguage === "en" ? "es" : "en";
    //setCurrentLanguage(newLanguage);
    //changeLanguage(newLanguage);
  };

  return (
    <div className={styles.container}>
      <p className={styles.p}>Change language</p>
      <button className={styles.button} type="button" onClick={() => handleChangeLanguage()}>
        <LanguageSVG />
      </button>
      {isOpen && (
        <ul className={styles.langContainer}>
          <li>English</li>
          <li>Español</li>
        </ul>
      )}
    </div>
  );
}
