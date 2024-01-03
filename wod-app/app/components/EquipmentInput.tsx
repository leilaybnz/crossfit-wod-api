import { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react";
import styles from "../styles/addRemoveInput.module.css";

interface EquipmentInputProps {
  equipment: string[];
  setEquipment: Dispatch<SetStateAction<string[]>>;
}

export default function EquipmentInput({
  equipment,
  setEquipment,
}: EquipmentInputProps) {
  //const [inputList, setInputList] = useState([{ equipment: "" }]);

  const handleInputChange = (
    index: any,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEquipment((oldEquipment) => {
      return oldEquipment.map((equipment, i) => {
        if (i === index) {
          return event.target.value;
        } else {
          return equipment;
        }
      });
    });
  };

  const addInput = () => {
    setEquipment((equipment) => [...equipment, ""]);
  };
  const removeInput = (index: number) => {
    setEquipment((equipment) => {
      const newEquipment = [...equipment];
      newEquipment.splice(index, 1);
      return newEquipment;
    });
  };

  return (
    <div className={styles.form}>
      {equipment.map((input, index) => {
        return (
          <Fragment key={index}>
            <div className={styles.inputContainer}>
              <label htmlFor="equipment">Equipment</label>
              <input
                name="equipment"
                id="equipment"
                placeholder="Add workout equipment"
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
