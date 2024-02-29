import { Fragment } from "react";
import styles from "../styles/addRemoveInput.module.css";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function TrainerTipsInput() {
  const { register, control } = useFormContext<{
    trainerTips: { value: string }[];
  }>();

  const { append, remove, fields } = useFieldArray({
    control: control,
    name: "trainerTips",
  });

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
                className={styles.input}
              />
            </div>
          </Fragment>
        );
      })}
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
          onClick={() => removeInput(fields.length - 1)}
          className={`${styles.button} ${styles.remove}`}
        >
          -
        </button>
      </div>
    </div>
  );
}
