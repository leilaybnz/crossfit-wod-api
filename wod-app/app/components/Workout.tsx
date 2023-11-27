import styles from "../styles/workout.module.css";
import { WorkoutType } from "../types";
  
export default function Workout(workout: WorkoutType) {

  return (
       <div className={styles.container}>
         <p className={styles.title}>Workout</p>
         <p className={styles.name}>
           Name: <span className={styles.text}>{workout.name}</span>
         </p>
         <p className={styles.name}>
           Mode: <span className={styles.text}>WM</span>
         </p>
         <p className={styles.name}>
           Equipment: <span className={styles.text}>WE</span>
         </p>
         <p className={styles.name}>
           Exercises: <span className={styles.text}>WEX</span>
         </p>
         <p className={styles.name}>
           Trainer tips: <span className={styles.text}>WTT</span>
         </p>
       </div>
  )
}
