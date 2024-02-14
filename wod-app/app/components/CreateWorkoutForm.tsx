import styles from "../styles/form.module.css";
import ActivationInput from "./ActivationInput";
import EquipmentInput from "./EquipmentInput";
import ExercisesInput from "./ExercisesInput";
import MobilityInput from "./MobilityInput";
import TrainerTipsInput from "./TrainerTipsInput";
import { SubmitHandler, useForm } from "react-hook-form";

export interface FormWorkoutProps {
  name: string;
  mode: string;
  equipment: { value: string }[];
  mobility: {value: string}[];
  activation: {value: string}[];
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
  equipment: string[];
  mobility: string[];
  activation: string[];
  exercises: string[];
  trainerTips: string[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

function postWorkout(body: {
  name: string;
  mode: string;
  equipment: string[];
  mobility: string[];
  activation: string[];
  exercises: string[];
  trainerTips: string[];
}) {
  return fetch("http://localhost:5000/api/v1/workouts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json() as Promise<PostWorkoutResponseData>);
}

export default function WorkoutForm() {
  const { reset, handleSubmit, register, control } = useForm<FormWorkoutProps>({
    defaultValues: {
      name: "",
      mode: "",
      equipment: [{ value: "" }],
      mobility: [{ value: "" }],
      activation: [{ value: "" }],
      exercises: [{ value: "" }],
      trainerTips: [{ value: "" }],
    },
  });

  const addWorkout: SubmitHandler<FormWorkoutProps> = ({
    name,
    mode,
    equipment,
    mobility,
    activation,
    exercises,
    trainerTips,
  }) => {
    postWorkout({
      name: name.trim(),
      mode: mode.trim(),
      equipment: equipment.map((item) => item.value),
      mobility: mobility.map((item) => item.value),
      activation: activation.map((item) => item.value),
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
          <MobilityInput register={register} formControl={control}/>
      </div>
      <div className={styles.label}>
          <ActivationInput register={register} formControl={control}/>
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
