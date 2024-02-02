"use client";
import { useEffect, useState } from "react";
import styles from "../styles/container.module.css";
import { WorkoutType } from "../types";
import Button from "./Button";
import CreateWorkoutButton from "./CreateWorkoutButton";
import Form from "./Form";
import Workout from "./Workout";

export default function Container() {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/workouts`)
      .then((response) => response.json())
      .then((json) => {
        const data = json.allWorkouts;
        setWorkouts(data);
        setShouldRefresh(false); //executes after the fetch && after we get the response
      });
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
