import { Dispatch, SetStateAction } from "react";
import styles from "../styles/member.module.css";
import { MemberType } from "../types";
import DeleteMemberButton from "./DeleteMemberButton";

interface MemberProps {
  member: MemberType;
  setShouldRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function Member({ member, setShouldRefresh }: MemberProps) {
  return (
    <article className={styles.container}>
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
      <DeleteMemberButton memberId={member.id} setShouldRefresh={setShouldRefresh}/>
    </article>
  );
}
