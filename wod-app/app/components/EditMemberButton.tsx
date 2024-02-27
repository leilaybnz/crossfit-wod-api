import { useState } from "react";
import styles from "../styles/editButton.module.css";
import EditSvg from "./EditSvg";
import EditMemberForm from "./EditMemberForm";
import { MemberType } from "../types";

interface EditMemberButtonProps {
  member: MemberType;
}

export default function EditMemberButton({ member }: EditMemberButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.container}
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <EditSvg />
      </button>
      {isFormOpen && <EditMemberForm member={member} />}
    </>
  );
}
