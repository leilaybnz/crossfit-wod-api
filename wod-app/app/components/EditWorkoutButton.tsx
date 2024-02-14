import { useState } from "react";
import styles from "../styles/editButton.module.css";
import EditSvg from "./EditSvg";
import EditWorkoutForm from "./EditWorkoutForm";

interface EditWorkoutButtonProps {
  workoutId: string;
}

export default function EditWorkoutButton({
  workoutId,
}: EditWorkoutButtonProps) {
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
      {isFormOpen && (
        <EditWorkoutForm/>
      )}
    </>
  );
}
