"use client";
import Workout from "./Workout";
import Member from "./Member";
import styles from "../styles/container.module.css";
import { useEffect, useState } from "react";
import { WorkoutType } from "../types";
import Button from "./Button";
import CreateWorkoutButton from "./CreateWorkoutButton";
import Form from "./Form";

export default function Container() {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/workouts`)
      .then((response) => response.json())
      .then((json) => {
        const data = json.allWorkouts;
        setWorkouts(data);
      });
      //setShouldRefresh(false);
  }, [shouldRefresh]);

  const handleClick = () => {
    setIsShown(!isShown);
  };

  const handleClickCreateBtn = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      {/* <pre>{JSON.stringify(workouts, null, 2)}</pre>
     
      <section className={styles.container}>
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
      </section> */}
      <Button title="workouts" onClick={handleClick} />
      {/* <Button title="members" onClick={handleClick} /> */}
      {isShown && (
        <section className={styles.container}>
          {workouts.map((workout, i) => (
            <Workout workout={workout} key={i} setShouldRefresh={setShouldRefresh}/>
          ))}
        </section>
      )}
      <CreateWorkoutButton onClick={handleClickCreateBtn} />
      {showForm && <Form />}
    </>
  );
}
