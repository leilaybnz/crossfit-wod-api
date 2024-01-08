import styles from "../styles/nav.module.css";
import LanguageButton from "./LanguageButton";

export default function Nav() {
  return (
    <>
      <nav className={styles.container}>
        🏋🏽‍♂️ WORKOUT OF THE DAY 🏋🏽‍♀️
        <LanguageButton />
      </nav>
    </>
  );
}
