import { useState } from "react";
import styles from "../styles/form.module.css";
import AddRemoveInputField from "./AddRemoveInput";

interface AddWorkoutPostProps {
  name: string;
  mode: string;
  equipment: string[];
  exercises: string[];
  trainerTips: string[];
}

export interface WorkoutPostResponseData {
  status: string;
  data: WorkoutData;
}

export interface WorkoutData {
  name: string;
  mode: string;
  equipment: any[];
  exercises: any[];
  trainerTips: any[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

function addWorkoutPost(body: AddWorkoutPostProps) {
  return fetch("http://localhost:3001/api/v1/workouts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json() as Promise<WorkoutPostResponseData>);
}

export default function Form() {
  const [newName, setNewName] = useState("");
  const [newMode, setNewMode] = useState("");
  const [newEquipment, setNewEquipment] = useState([]);
  const [newExercises, setNewExercises] = useState([]);
  const [newTrainerTips, setNewTrainerTips] = useState([]);

  const addWorkout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = newName.trim();
    const mode = newMode.trim();
    const equipment = newEquipment;
    const exercises = newExercises;
    const trainerTips = newTrainerTips;

    if (name && mode && equipment && exercises && trainerTips) {
      addWorkoutPost({
        name,
        mode,
        equipment,
        exercises,
        trainerTips,
      }).then((data) => {
        setNewName("");
        setNewMode("");
        setNewEquipment([]);
        setNewExercises([]);
        setNewTrainerTips([]);
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={addWorkout}>
      <label className={styles.label}>
        Name
        <input
          type="text"
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
        <input placeholder="Add workout exercises" aria-required="true" />
        <input placeholder="Add workout exercises" aria-required="true" />
        <input placeholder="Add workout exercises" aria-required="true" />
      </label>
      <label className={styles.label}>
        Trainer tips
        <input placeholder="Add workout trainer tips" aria-required="true" />
        <input placeholder="Add workout trainer tips" aria-required="true" />
        <input placeholder="Add workout trainer tips" aria-required="true" />
      </label>
      <button className={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
}
