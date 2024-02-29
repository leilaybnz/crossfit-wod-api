import styles from "../styles/card.module.css";
import { WorkoutType } from "../types";
import DeleteWorkoutButton from "./DeleteWorkoutButton";
import EditWorkoutButton from "./EditWorkoutButton";

interface WorkoutProps {
  workout: WorkoutType;
}

export default function Workout({ workout }: WorkoutProps) {
  return (
    <article className={styles.containerWorkout}>
      <p className={styles.title}>Workout</p>
      <div className={styles.content}>
        <p className={styles.name}>
          Name: <span className={styles.text}>{workout.name}</span>
        </p>
        <p className={styles.name}>
          Mode: <span className={styles.text}>{workout.mode}</span>
        </p>
        <div className={styles.name}>
          Equipment:
          <ul className={styles.list}>
            {workout.equipment.map((equipment) => (
              <li key={equipment} className={styles.text}>
                {" " + equipment}
              </li>
            ))}
          </ul>
        </div>
        {workout.mobility && (
          <div className={styles.name}>
            Mobility:
            <ul className={styles.list}>
              {workout.mobility.map((mobility) => (
                <li key={mobility} className={styles.text}>
                  {" " + mobility}
                </li>
              ))}
            </ul>
          </div>
        )}
        {workout.activation && (
          <div className={styles.name}>
            Activation:
            <ul className={styles.list}>
              {workout.activation.map((activation) => (
                <li key={activation} className={styles.text}>
                  {" " + activation}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.name}>
          Exercises:
          <ul className={styles.listThunder}>
            {workout.exercises.map((exercise) => (
              <li key={exercise} className={styles.text}>
                {" " + exercise}
              </li>
            ))}
          </ul>
        </div>
        {workout.trainerTips && (
          <div className={styles.name}>
            Trainer tips:
            <ul className={styles.list}>
              {workout.trainerTips.map((trainerTip) => (
                <li key={trainerTip} className={styles.text}>
                  {" " + trainerTip}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.arrow}></div>
        <DeleteWorkoutButton workoutId={workout.id} />
        <EditWorkoutButton workout={workout} />
      </div>
    </article>
  );
}
