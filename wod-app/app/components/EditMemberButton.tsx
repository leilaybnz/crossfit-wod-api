import { useState } from "react";
import styles from "../styles/editButton.module.css";
import EditSvg from "./EditSvg";

interface EditMemberButtonProps {
  memberId: string;
}

export default function EditMemberButton({ memberId }: EditMemberButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.container}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <EditSvg />
      </button>
    </>
  );
}
