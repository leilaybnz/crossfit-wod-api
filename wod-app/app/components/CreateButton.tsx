import styles from '../styles/button.module.css';

export default function CreateButton(props: any) {

    return (
        <>
        <button className={styles.button} onClick={props.onClick}>Create {props.title}</button>
        </>
    )
}