import { useState } from "react";
import styles from "../styles/deleteButton.module.css";
import TrashCanSVG from "./TrashCanSvg";
import { useRouter } from "next/navigation";
import { deleteMemberAction } from "../actions";

interface DeleteMemberButtonProps {
  memberId: string;
}

export default function DeleteMemberButton({
  memberId,
}: DeleteMemberButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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
              onClick={async () => {
                await deleteMemberAction(memberId);
                setIsModalOpen(false);
              }}
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
