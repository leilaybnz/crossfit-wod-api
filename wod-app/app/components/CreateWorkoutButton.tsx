import { useState } from 'react';
import styles from '../styles/button.module.css';
import Form from './Form';

export default function CreateWorkoutButton(props: any) {

    return (
        <>
        <button className={styles.button} onClick={props.onClick}>Create workout</button>
        </>
    )
}