import { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react";
import styles from "../styles/addRemoveInput.module.css";
import { FormWorkoutProps } from "./WorkoutForm";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

interface ExercisesInputProps {
  formControl: Control<FormWorkoutProps>;
  register: UseFormRegister<FormWorkoutProps>;
}

export default function ExercisesInput({
  register,
  formControl,
}: ExercisesInputProps) {
  const { append, remove, fields } = useFieldArray({
    control: formControl,
    name: "exercises",
  });
  const handleInputChange = (
    index: any,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setExercises((oldExercises) => {
      return oldExercises.map((exercises, i) => {
        if (i === index) {
          return event.target.value;
        } else {
          return exercises;
        }
      });
    });
  };

  const addInput = () => {
    append({ value: "" });
  };

  const removeInput = (index: number) => {
    remove(index);
  };

  return (
    <div className={styles.form}>
      <label htmlFor="exercises">Exercises</label>
      {fields.map((input, index) => {
        return (
          <Fragment key={input.id}>
            <div className={styles.inputContainer}>
              <input
                id="exercises"
                placeholder="Add workout exercises"
                {...register(`exercises.${index}.value`)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                type="button"
                onClick={addInput}
                className={`${styles.button} ${styles.add}`}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => removeInput(index)}
                className={`${styles.button} ${styles.remove}`}
              >
                -
              </button>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
