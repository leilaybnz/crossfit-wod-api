import styles from "../styles/member.module.css";

export default function Member() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Member</p>
      <p className={styles.name}>
        Name: <span className={styles.text}>&quot;name&quot;</span>
      </p>
      <p className={styles.name}>
        Birthday: <span className={styles.text}>&quot;Birthday&quot;</span>
      </p>
      <p className={styles.name}>
        Mail: <span className={styles.text}>&quot;mail&quot;</span>
      </p>
    </div>
  );
}
