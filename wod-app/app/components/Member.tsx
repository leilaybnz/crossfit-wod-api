import styles from "../styles/member.module.css";
import { MemberType } from "../types";

interface MemberProps {
  member: MemberType;
}

export default function Member({ member }: MemberProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Member</p>
      <p className={styles.name}>
        Name: <span className={styles.text}>{member.name}</span>
      </p>
      <p className={styles.name}>
        Birthday: <span className={styles.text}>{member.dateOfBirth}</span>
      </p>
      <p className={styles.name}>
        Mail: <span className={styles.text}>{member.email}</span>
      </p>
    </div>
  );
}
