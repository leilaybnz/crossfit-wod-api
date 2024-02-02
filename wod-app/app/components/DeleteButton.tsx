import { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles/deleteButton.module.css";
import TrashCanSVG from "./TrashCanSvg";

interface DeleteButtonProps {
  workoutId: string;
  setShouldRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteButton({
  workoutId,
  setShouldRefresh,
}: DeleteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function deleteWorkout({ workoutId, setShouldRefresh }: DeleteButtonProps) {
    fetch(`http://localhost:5000/api/v1/workouts/${workoutId}`, {
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
        <div className={styles.modal}>
          <p>Are you sure you want to delete this workout?</p>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={() => deleteWorkout({ workoutId, setShouldRefresh })}
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
