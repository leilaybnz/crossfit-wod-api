'use client'
import Workout from "./Workout";
import Member from "./Member";
import styles from '../styles/cardsContainer.module.css';
import { useEffect, useState } from "react";
import { WorkoutType } from "../types";

export default function CardsContainer() {

    const [workouts, setWorkouts] = useState<WorkoutType[]>([]);

     useEffect(() => {
             fetch(`http://localhost:5000/api/v1/workouts`)
             .then((response) => response.json())
             .then((json) => {
             const data = json.allWorkouts;
             setWorkouts(data);
             })
     }, []);

    return(
        <>
        {/* <pre>{JSON.stringify(workouts, null, 2)}</pre> */}
        <section className={styles.container}>
        {workouts.map((workout, i) => (
            <Workout workout={workout} key={i}/>
        ))}
        </section>
        <section className={styles.container}>
            <Member/>
            <Member/>
            <Member/>
            <Member/>
            <Member/>
        </section>
        </>
    )
}