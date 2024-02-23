import { editWorkoutAction } from "../actions";
import styles from "../styles/form.module.css";
import ActivationInput from "./ActivationInput";
import EquipmentInput from "./EquipmentInput";
import ExercisesInput from "./ExercisesInput";
import MobilityInput from "./MobilityInput";
import TrainerTipsInput from "./TrainerTipsInput";
import { SubmitHandler, useForm } from "react-hook-form";

export interface EditFormWorkoutProps {
  name: string;
  mode: string;
  equipment: { value: string }[];
  mobility: { value: string }[];
  activation: { value: string }[];
  exercises: { value: string }[];
  trainerTips: { value: string }[];
  id: string;
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
  const { reset, handleSubmit, register, control } = useForm<EditFormWorkoutProps>({
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
    },
  });

  const editWorkout: SubmitHandler<EditFormWorkoutProps> = ({
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
      workoutId: id,
      changes: {
        name: name,
        mode: mode,
        equipment: equipment.map((equipment) => equipment.value),
        mobility: mobility.map((mobility) => mobility.value),
        activation: activation.map((activation) => activation.value),
        exercises: exercises.map((exercise) => exercise.value),
        trainerTips: trainerTips.map((trainerTip) => trainerTip.value),
        updatedAt: updatedAt,
      },
    }).then(() => {
      reset();
    });
  };

  return (
    <FormProvider {...methods}>
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
        m
      </form>
    </FormProvider>
  );
}
