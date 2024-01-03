import { FormEvent, useState } from "react";
import styles from "../styles/form.module.css";
import AddRemoveInputField from "./AddRemoveInput";

export default function Form() {
  const [newName, setNewName] = useState("");
  const [newMode, setNewMode] = useState("");
  const [newEquipment, setNewEquipment] = useState([]);
  const [newExercises, setNewExercises] = useState([]);
  const [newTrainerTips, setNewTrainerTips] = useState([]);

  const addWorkout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = newName.trim()
    const mode = newMode.trim()
    const equipment = newEquipment;
    const exercises = newExercises;
    const trainerTips = newTrainerTips;

    if (name && mode && equipment && exercises && trainerTips) {
      fetch("http://localhost:5000/api/v1/workouts", {
        method: "POST",
        body: JSON.stringify({
          name,
          mode,
          equipment,
          exercises,
          trainerTips
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(response => response.json())
        .then(data => {
          setNewName("")
          setNewMode("")
          setNewEquipment([])
          setNewExercises([])
          setNewTrainerTips([])
        })
    }
  }

  return (
      <form className={styles.form} onClick={addWorkout}>
        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            placeholder="Add workout name"
            aria-required="true"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Mode
          <input
            type="text"
            name="mode"
            placeholder="Add workout mode"
            aria-required="true"
            value={newMode}
            onChange={(e) => setNewMode(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Equipment
          <AddRemoveInputField />
        </label>
        <label className={styles.label}>
          Exercises
          <input name="exercises" placeholder="Add workout exercises" aria-required="true" />
          <input name="exercises" placeholder="Add workout exercises" aria-required="true" />
          <input name="exercises" placeholder="Add workout exercises" aria-required="true" />
        </label>
        <label className={styles.label}>
          Trainer tips
          <input name="trainer tips" placeholder="Add workout trainer tips" aria-required="true" />
          <input name="trainer tips" placeholder="Add workout trainer tips" aria-required="true" />
          <input name="trainer tips" placeholder="Add workout trainer tips" aria-required="true" />
        </label>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
  )
}
