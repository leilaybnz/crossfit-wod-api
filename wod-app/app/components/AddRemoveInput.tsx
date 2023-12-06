import { ChangeEvent, useState } from "react";
import styles from "../styles/addRemoveInput.module.css";

export default function AddRemoveInputField() {
  const [inputFields, setInputFields] = useState([{ equipment: "" }]);

  const handleFormChange = (
    index: any,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
  };

  const addInput = () => {
    let newField = { equipment: "" };
    setInputFields([...inputFields, newField]);
  };

  return (
    <div className={styles.form}>
      {inputFields.map((input, index) => {
        return (
          <>
            <input
              name="equipment"
              placeholder="Add workout equipment"
              value={input.equipment}
              onChange={() => handleFormChange(index, event)}
              className={styles.input}
              key={index}
            />
            <button onClick={addInput} className={styles.button}>
              +
            </button>
          </>
        );
      })}
    </div>
  );
}
