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
  return (
    <button
      type="button"
      className={styles.container}
      onClick={() => deleteWorkout(workoutId)}
    >
      <TrashCanSVG />
    </button>
  );
}
