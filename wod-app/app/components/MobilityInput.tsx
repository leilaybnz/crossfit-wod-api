import { Fragment } from "react";
import styles from "../styles/addRemoveInput.module.css";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function MobilityInput() {
  const { register, control } = useFormContext<{
    mobility: { value: string }[];
  }>();

  const { append, remove, fields } = useFieldArray({
    control: control,
    name: "mobility",
  });

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
