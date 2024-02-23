import { Fragment } from "react";
import styles from "../styles/addRemoveInput.module.css";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ActivationInput() {
  const { register, control } = useFormContext<{
    activation: { value: string }[];
  }>();

  const { append, remove, fields } = useFieldArray({
    control: control,
    name: "activation",
  });

  const addInput = () => {
    append({ value: "" });
  };
  const removeInput = (index: number) => {
    remove(index);
  };

  return (
    <div className={styles.form}>
      <label htmlFor="activation">Activation</label>
      {fields.map((input, index) => {
        return (
          <Fragment key={input.id}>
            <div className={styles.inputContainer}>
              <input
                id="activation"
                placeholder="Add workout activation"
                {...register(`activation.${index}.value`)}
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
