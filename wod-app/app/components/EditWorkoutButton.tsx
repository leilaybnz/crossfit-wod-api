import { useState } from "react";
import styles from "../styles/editButton.module.css";
import EditSvg from "./EditSvg";
import EditWorkoutForm from "./EditWorkoutForm";
import { WorkoutType } from "../types";

interface EditWorkoutButtonProps {
  workout: WorkoutType;
}

export default function EditWorkoutButton({ workout }: EditWorkoutButtonProps) {
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
      {isFormOpen && <EditWorkoutForm workout={workout} />}
    </>
  );
}
