import styles from "../styles/card.module.css";
import { MemberType } from "../types";
import DeleteMemberButton from "./DeleteMemberButton";
import EditMemberButton from "./EditMemberButton";

interface MemberProps {
  member: MemberType;
}

export default function Member({ member }: MemberProps) {
  return (
    <article className={styles.containerMember}>
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
      <EditMemberButton member={member} />
      <DeleteMemberButton memberId={member.id} />
    </article>
  );
}
