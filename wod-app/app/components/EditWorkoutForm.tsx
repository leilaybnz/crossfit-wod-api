import { editWorkoutAction } from "../actions";
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
  mobility: { value: string }[];
  activation: { value: string }[];
  exercises: { value: string }[];
  trainerTips: { value: string }[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatchWorkoutResponseData {
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

export default function EditWorkoutForm(workout: WorkoutData) {
  const { reset, handleSubmit, register, control } = useForm<FormWorkoutProps>({
    defaultValues: {
      name: workout.name,
      mode: workout.mode,
      equipment: workout.equipment.map((equipment) => ({ value: equipment })),
      mobility: workout.mobility.map((mobility) => ({ value: mobility })),
      activation: workout.activation.map((activation) => ({
        value: activation,
      })),
      exercises: workout.exercises.map((exercise) => ({ value: exercise })),
      trainerTips: workout.trainerTips.map((trainerTip) => ({
        value: trainerTip,
      })),
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
    },
  });

  const editWorkout: SubmitHandler<FormWorkoutProps> = ({
    name,
    mode,
    equipment,
    mobility,
    activation,
    exercises,
    trainerTips,
    id,
    updatedAt,
  }) => {
    editWorkoutAction({
      name: name.trim(),
      mode: mode.trim(),
      equipment: equipment.map((item) => item.value),
      mobility: mobility.map((item) => item.value),
      activation: activation.map((item) => item.value),
      exercises: exercises.map((item) => item.value),
      trainerTips: trainerTips.map((item) => item.value),
      id: id,
      updatedAt: updatedAt,
    }).then(() => {
      reset();
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(editWorkout)}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          placeholder="Edit workout name"
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
          placeholder="Edit workout mode"
          {...register("mode", {
            required: true,
          })}
        />
      </label>
      <div className={styles.label}>
        <EquipmentInput register={register} formControl={control} />
      </div>
      <div className={styles.label}>
        <MobilityInput register={register} formControl={control} />
      </div>
      <div className={styles.label}>
        <ActivationInput register={register} formControl={control} />
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
