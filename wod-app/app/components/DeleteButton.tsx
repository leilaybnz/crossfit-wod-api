import { useState } from "react";
import styles from "../styles/deleteButton.module.css";
import TrashCanSVG from "./TrashCanSvg";

function deleteWorkout(workoutId: string) {
  return fetch(`http://localhost:5000/api/v1/workouts/${workoutId}`, {
    method: "DELETE",
  }).then((response) => response.json());
}

interface DeleteButtonProps {
  workoutId: string;
}

export default function DeleteButton({ workoutId }: DeleteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <button type="button" onClick={() => deleteWorkout(workoutId)}>Yes</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>No</button>
          </div>
        </div>
      )}
    </>
  );
}
