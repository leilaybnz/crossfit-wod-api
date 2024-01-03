import { useState } from "react";
import styles from "../styles/form.module.css";
import EquipmentInput from "./EquipmentInput";
import ExercisesInput from "./ExercisesInput";
import TrainerTipsInput from "./TrainerTipsInput";

interface PostWorkoutProps {
  name: string;
  mode: string;
  equipment: string[];
  exercises: string[];
  trainerTips: string[];
}

export interface PostWorkoutResponseData {
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

function postWorkout(body: PostWorkoutProps) {
  return fetch("http://localhost:5000/api/v1/workouts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json() as Promise<PostWorkoutResponseData>);
}

export default function Form() {
  const [newName, setNewName] = useState("");
  const [newMode, setNewMode] = useState("");
  const [equipment, setEquipment] = useState([""]);
  const [exercises, setExercises] = useState([""]);
  const [trainerTips, setTrainerTips] = useState([""]);

  const reset = () => {
    setNewName("");
    setNewMode("");
    setEquipment([""]);
    setExercises([""]);
    setTrainerTips([""]);
  };

  const addWorkout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = newName.trim();
    const mode = newMode.trim();

    if (name && mode && equipment && exercises && trainerTips) {
      postWorkout({
        name,
        mode,
        equipment,
        exercises,
        trainerTips,
      }).then((data) => {
        reset();
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={addWorkout}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          name="name"
          placeholder="Add workout name"
          required
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
          required
          value={newMode}
          onChange={(e) => setNewMode(e.target.value)}
        />
      </label>
      <div className={styles.label}>
        <EquipmentInput equipment={equipment} setEquipment={setEquipment} />
      </div>
      <div className={styles.label}>
        <ExercisesInput exercises={exercises} setExercises={setExercises} />
      </div>
      <div className={styles.label}>
        <TrainerTipsInput
          trainerTips={trainerTips}
          setTrainerTips={setTrainerTips}
        />
      </div>
      <button className={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
}
