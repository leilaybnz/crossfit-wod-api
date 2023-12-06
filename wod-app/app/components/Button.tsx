import { useState } from "react";
import styles from "../styles/button.module.css";

export default function Button(props: any) {
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setIsShown(true);
  }

  return (
    <>
      <button className={styles.button}>
        See all {props.title}
      </button>
      {isShown && <p>isShown</p>}
    </>
  );
}
