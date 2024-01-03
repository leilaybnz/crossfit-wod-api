import { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react";
import styles from "../styles/addRemoveInput.module.css";

interface TrainerTipsInputProps {
  trainerTips: string[],
  setTrainerTips: Dispatch<SetStateAction<string[]>>;
}

export default function TrainerTipsInput({trainerTips, setTrainerTips}: TrainerTipsInputProps) {
  //const [inputList, setInputList] = useState([{ equipment: "" }]);

  const handleInputChange = (
    index: any,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setTrainerTips(oldTrainerTips => {
      return oldTrainerTips.map((trainerTips, i) => {
        if(i === index) {
          return event.target.value;
        } else {
          return trainerTips;
        }
      })
    })
  };

  const addInput = () => {
    setTrainerTips((trainerTips) => [...trainerTips, ""]);
  };
  const removeInput = (index: number) => {
    setTrainerTips((trainerTips) => {
      const newTrainerTips = [...trainerTips];
      trainerTips.splice(index, 1)
      return newTrainerTips;
    })
  };

  return (
    <div className={styles.form}>
      {trainerTips.map((input, index) => {
        return (
          <Fragment key={index}>
            <div className={styles.inputContainer}>
              <input
                name="trainer tips"
                placeholder="Add workout trainer tips"
                value={input}
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
