import { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles/deleteButton.module.css";
import TrashCanSVG from "./TrashCanSvg";

interface DeleteMemberButtonProps {
  memberId: string;
  setShouldRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteMemberButton({
  memberId,
  setShouldRefresh,
}: DeleteMemberButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function deleteMember({ memberId, setShouldRefresh }: DeleteMemberButtonProps) {
    fetch(`http://localhost:5000/api/v1/members/${memberId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setShouldRefresh(true);
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
            <button
              type="button"
              onClick={() => deleteMember({ memberId, setShouldRefresh })}
            >
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
