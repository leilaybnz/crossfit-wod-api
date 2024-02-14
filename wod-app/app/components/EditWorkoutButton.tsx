import { useState } from "react";
import styles from "../styles/editButton.module.css";
import EditSvg from "./EditSvg";

interface EditWorkoutButtonProps {
  workoutId: string;
}

export default function EditWorkoutButton({
  workoutId,
}: EditWorkoutButtonProps) {
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
