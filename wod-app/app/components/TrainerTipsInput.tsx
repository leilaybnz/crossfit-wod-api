import { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react";
import styles from "../styles/addRemoveInput.module.css";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { FormWorkoutProps } from "./WorkoutForm";

interface TrainerTipsInputProps {
  formControl: Control<FormWorkoutProps>;
  register: UseFormRegister<FormWorkoutProps>;
}

export default function TrainerTipsInput({
  register,
  formControl,
}: TrainerTipsInputProps) {
  const { append, remove, fields } = useFieldArray({
    control: formControl,
    name: "trainerTips",
  });

  const handleInputChange = (
    index: any,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setTrainerTips((oldTrainerTips) => {
      return oldTrainerTips.map((trainerTips, i) => {
        if (i === index) {
          return event.target.value;
        } else {
          return trainerTips;
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
      <label htmlFor="trainer tips">Trainer tips</label>
      {fields.map((input, index) => {
        return (
          <Fragment key={input.id}>
            <div className={styles.inputContainer}>
              <input
                id="trainer tips"
                placeholder="Add workout trainer tips"
                {...register(`trainerTips.${index}.value`)}
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
