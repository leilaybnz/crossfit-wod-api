"use client";
import Workout from "./Workout";
import Member from "./Member";
import styles from "../styles/container.module.css";
import { useEffect, useState } from "react";
import { MemberType, WorkoutType } from "../types";
import Button from "./Button";
import CreateWorkoutButton from "./CreateWorkoutButton";
import Form from "./Form";

export default function Container() {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [isShownWorkout, setIsShownWorkout] = useState(false);
  const [isShownMember, setIsShownMember] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const workoutsFetch = fetch(`http://localhost:5000/api/v1/workouts`).then(
      (response) => response.json()
    );
    const membersFetch = fetch(`http://localhost:5000/api/v1/members`).then(
      (response) => response.json()
    );

    Promise.all([workoutsFetch, membersFetch])
    .then((json) => {
      console.log(workoutsFetch);
      console.log(membersFetch);
      const workoutsData: WorkoutType = json.allWorkouts;
      const membersData: MemberType = json.data;
      setWorkouts(workoutsData);
      setMembers(membersData);
    })
    // fetch(`http://localhost:5000/api/v1/workouts`),//ok
    //   fetch(`http://localhost:5000/api/v1/members`)//once this is no longer commented, new error  can't access property "map", workouts is undefined
    //     .then((response) => response.json())
    //     .then((json) => {
    //       const workoutData = json.allWorkouts;
    //       // const memberData = json.data;
    //       setWorkouts(workoutData);
    //       // setMembers(memberData);
    //       setShouldRefresh(false); //executes after the fetch && after we get the response
    //     });
  }, [shouldRefresh]);

  const handleClickWorkout = () => {
    setIsShownWorkout(!isShownWorkout);
  };

  const handleClickMember = () => {
    setIsShownMember(!isShownMember);
  };

  const handleClickCreateBtn = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <pre>{JSON.stringify(members, null, 2)}</pre>
      <Button title="workouts" onClick={handleClickWorkout} />
      {/* <Button title="members" onClick={handleClickMember} /> */}
      {isShownWorkout && (
        <section className={styles.container}>
          {workouts.map((workout, i) => (
            <Workout
              workout={workout}
              key={i}
              setShouldRefresh={setShouldRefresh}
            />
          ))}
        </section>
      )}
      {/* {isShownMember && (
        <section className={styles.container}>
          {members.map((member, i) => (
            <Member member={member} key={i} />
          ))}
        </section>
      )} */}
      <CreateWorkoutButton onClick={handleClickCreateBtn} />
      {showForm && <Form />}
    </>
  );
}
