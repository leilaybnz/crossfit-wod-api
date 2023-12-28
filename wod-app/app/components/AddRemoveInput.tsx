import { ChangeEvent, useState } from "react";
import styles from "../styles/addRemoveInput.module.css";

export default function AddRemoveInputField() {
  const [inputList, setInputList] = useState([{ equipment: "" }]);

  const handleInputChange = (
    index: any,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    let fields = [...inputList];
    fields[index][name] = value;
    setInputList(fields);
  };

  const addInput = () => {
    let newInput = { equipment: "" };
    setInputList([...inputList, newInput]);
  };
  const removeInput = (index: any) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  return (
    <div className={styles.form}>
      {inputList.map((input, index) => {
        return (
          <>
            <div className={styles.inputContainer}>
              <input
                name="equipment"
                placeholder="Add workout equipment"
                value={input.equipment}
                onChange={() => handleInputChange(index, event)}
                className={styles.input}
                key={index}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={addInput}
                className={`${styles.button} ${styles.add}`}
              >
                +
              </button>
              <button
                onClick={removeInput}
                className={`${styles.button} ${styles.remove}`}
              >
                -
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}
