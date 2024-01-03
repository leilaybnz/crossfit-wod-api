import { useState } from "react";
import styles from "../styles/form.module.css";
import EquipmentInput from "./EquipmentInput";
import ExercisesInput from "./ExercisesInput";
import TrainerTipsInput from "./TrainerTipsInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { json } from "stream/consumers";

export interface FormWorkoutProps {
  name: string;
  mode: string;
  equipment: { value: string }[];
  exercises: { value: string }[];
  trainerTips: { value: string }[];
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

function postWorkout(body: {
  name: string;
  mode: string;
  equipment: { value: string[] };
  exercises: { value: string[] };
  trainerTips: { value: string[] };
}) {
  return fetch("http://localhost:5000/api/v1/workouts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json() as Promise<PostWorkoutResponseData>);
}

export default function Form() {
  const { reset, handleSubmit, register, control } = useForm<FormWorkoutProps>({
    defaultValues: {
      name: "",
      mode: "",
      equipment: [{ value: "" }],
      exercises: [{ value: "" }],
      trainerTips: [{ value: "" }],
    },
  });

  const [name, setNewName] = useState("");
  const [mode, setNewMode] = useState("");
  const [equipment, setEquipment] = useState([""]);
  const [exercises, setExercises] = useState([""]);
  const [trainerTips, setTrainerTips] = useState([""]);

  const addWorkout: SubmitHandler<FormWorkoutProps> = ({
    name,
    mode,
    equipment,
    exercises,
    trainerTips,
  }) => {
    postWorkout({
      name: name.trim(),
      mode: mode.trim(),
      equipment: equipment.map((item) => item.value),
      exercises: exercises.map((item) => item.value),
      trainerTips: trainerTips.map((item) => item.value),
    }).then(() => {
      reset();
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(addWorkout)}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          placeholder="Add workout name"
          {...register("name", {
            required: true,
            minLength: 3,
          })}
        />
      </label>
      <label className={styles.label}>
        Mode
        <input
          type="text"
          placeholder="Add workout mode"
          {...register("mode", {
            required: true,
          })}
        />
      </label>
      <div className={styles.label}>
        <EquipmentInput register={register} formControl={control} />
      </div>
      <div className={styles.label}>
        <ExercisesInput register={register} formControl={control} />
      </div>
      <div className={styles.label}>
        <TrainerTipsInput register={register} formControl={control} />
      </div>
      <button className={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
}
