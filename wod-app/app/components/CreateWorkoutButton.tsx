import styles from '../styles/button.module.css';

export default function CreateWorkoutButton(props: any) {

    return (
        <>
        <button className={styles.button} onClick={props.onClick}>Create workout</button>
        </>
    )
}