import { useState } from "react";
import styles from "../styles/deleteButton.module.css";
import TrashCanSVG from "./TrashCanSvg";
import { useRouter } from "next/navigation";
import { deleteWorkoutAction } from "../actions";

interface DeleteButtonProps {
  workoutId: string;
}

export default function DeleteWorkoutButton({ workoutId }: DeleteButtonProps) {
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
        <div className={styles.modalWorkout}>
          <p>Are you sure you want to delete this workout?</p>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={async () => {
                await deleteWorkoutAction(workoutId);
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
