import { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react";
import styles from "../styles/addRemoveInput.module.css";

interface ExercisesInputProps {
  exercises: string[];
  setExercises: Dispatch<SetStateAction<string[]>>;
}

export default function ExercisesInput({
  exercises,
  setExercises,
}: ExercisesInputProps) {
  //const [inputList, setInputList] = useState([{ equipment: "" }]);

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
    setExercises((exercises) => [...exercises, ""]);
  };
  const removeInput = (index: number) => {
    setExercises((exercises) => {
      const newExercises = [...exercises];
      newExercises.splice(index, 1);
      return newExercises;
    });
  };

  return (
    <div className={styles.form}>
      {exercises.map((input, index) => {
        return (
          <Fragment key={index}>
            <div className={styles.inputContainer}>
              <label htmlFor="exercises">Exercises</label>
              <input
                name="exercises"
                id="exercises"
                placeholder="Add workout exercises"
                value={input}
                required
                onChange={(event) => handleInputChange(index, event)}
                className={styles.input}
                key={index}
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
