import { ChangeEvent, Fragment } from "react";
import styles from "../styles/addRemoveInput.module.css";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { FormWorkoutProps } from "./Form";

interface EquipmentInputProps {
  formControl: Control<FormWorkoutProps>;
  register: UseFormRegister<FormWorkoutProps>;
}

export default function MobilityInput({
  register,
  formControl,
}: EquipmentInputProps) {
  const { append, remove, fields } = useFieldArray({
    control: formControl,
    name: "mobility",
  });
  const handleInputChange = (
    index: any,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setMobility((oldMobility) => {
      return oldMobility.map((mobility, i) => {
        if (i === index) {
          return event.target.value;
        } else {
          return mobility;
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
      <label htmlFor="mobility">Mobility</label>
      {fields.map((input, index) => {
        return (
          <Fragment key={input.id}>
            <div className={styles.inputContainer}>
              <input
                id="mobility"
                placeholder="Add workout mobility"
                {...register(`mobility.${index}.value`)}
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
