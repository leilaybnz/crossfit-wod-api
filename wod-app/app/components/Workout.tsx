import { Dispatch, SetStateAction } from "react";
import styles from "../styles/workout.module.css";
import { WorkoutType } from "../types";
import DeleteWorkoutButton from "./DeleteWorkoutButton";

interface WorkoutProps{
  workout: WorkoutType;
  setShouldRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function Workout({ workout, setShouldRefresh }: WorkoutProps) {
  return (
    <article className={styles.container}>
      <p className={styles.title}>Workout</p>
      <p className={styles.name}>
        Name: <span className={styles.text}>{workout.name}</span>
      </p>
      <p className={styles.name}>
        Mode: <span className={styles.text}>{workout.mode}</span>
      </p>
      <p className={styles.name}>
        Equipment: <span className={styles.text}>{workout.equipment}</span>
      </p>
      <p className={styles.name}>
        Mobility: <span className={styles.text}>{workout.mobility}</span>
      </p>
      <p className={styles.name}>
        Activation: <span className={styles.text}>{workout.activation}</span>
      </p>
      <p className={styles.name}>
        Exercises: <span className={styles.text}>{workout.exercises}</span>
      </p>
      <p className={styles.name}>
        Trainer tips: <span className={styles.text}>{workout.trainerTips}</span>
      </p>
      <div className={styles.arrow}></div>
      <DeleteWorkoutButton
        workoutId={workout.id}
        setShouldRefresh={setShouldRefresh}
      />
    </article>
  );
}
