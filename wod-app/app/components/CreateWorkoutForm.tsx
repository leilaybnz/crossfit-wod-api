import { createWorkoutAction } from "../actions";
import styles from "../styles/form.module.css";
import ActivationInput from "./ActivationInput";
import EquipmentInput from "./EquipmentInput";
import ExercisesInput from "./ExercisesInput";
import MobilityInput from "./MobilityInput";
import TrainerTipsInput from "./TrainerTipsInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export interface CreateFormWorkoutProps {
  name: string;
  mode: string;
  equipment: { value: string }[];
  mobility: { value: string }[];
  activation: { value: string }[];
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

export default function WorkoutForm() {
  const methods = useForm<CreateFormWorkoutProps>({
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

  const { reset, handleSubmit, register } = methods;

  const addWorkout: SubmitHandler<CreateFormWorkoutProps> = ({
    name,
    mode,
    equipment,
    mobility,
    activation,
    exercises,
    trainerTips,
  }) => {
    createWorkoutAction({
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
    <FormProvider {...methods}>
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
          <EquipmentInput />
        </div>
        <div className={styles.label}>
          <MobilityInput />
        </div>
        <div className={styles.label}>
          <ActivationInput />
        </div>
        <div className={styles.label}>
          <ExercisesInput />
        </div>
        <div className={styles.label}>
          <TrainerTipsInput />
        </div>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
