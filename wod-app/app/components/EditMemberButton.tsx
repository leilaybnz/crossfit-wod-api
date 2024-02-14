import { useState } from "react";
import styles from "../styles/editButton.module.css";
import EditSvg from "./EditSvg";
import EditMemberForm from "./EditMemberForm";

interface EditMemberButtonProps {
  memberId: string;
}

export default function EditMemberButton({ memberId }: EditMemberButtonProps) {
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
      {isFormOpen && <EditMemberForm />}
    </>
  );
}
