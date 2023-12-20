import styles from "../styles/button.module.css";

export default function Button(props: any) {
  return (
    <>
      <button className={styles.button} onClick={props.onClick}>
        See all {props.title}
      </button>
    </>
  );
}
