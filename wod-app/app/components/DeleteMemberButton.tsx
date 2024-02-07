import { useState } from "react";
import styles from "../styles/deleteButton.module.css";
import TrashCanSVG from "./TrashCanSvg";

interface DeleteMemberButtonProps {
  memberId: string;
}

export default function DeleteMemberButton({
  memberId,
}: DeleteMemberButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function deleteMember({ memberId }: DeleteMemberButtonProps) {
    fetch(`http://localhost:3001/api/v1/members/${memberId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setIsModalOpen(false);
      });
  }

  return (
    <>
      <button
        type="button"
        className={styles.container}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <TrashCanSVG />
      </button>
      {isModalOpen && (
        <div className={styles.modalMember}>
          <p>Are you sure you want to delete this member?</p>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={() => deleteMember({ memberId })}>
              Yes
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
}
