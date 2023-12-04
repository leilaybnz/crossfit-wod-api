import styles from '../styles/form.module.css';

export default function Form() {
    return (
        <div className={styles.form}>
            <form>
                <label className={styles.label}>
                    Name
                    <input type="text" placeholder="Add workout name" aria-required="true"/>
                </label>
                <label className={styles.label}>
                    Mode
                    <input type="text" placeholder="Add workout mode" aria-required="false"/>
                </label>
                <label className={styles.label}>
                    Equipment
                    <input type="text" placeholder="Add workout equipment" aria-required="true"/>
                </label>
                <label className={styles.label}>
                    Exercises
                    <textarea placeholder="Add workout exercises" aria-required="true"/>
                </label>
                <label className={styles.label}>
                    Trainer tips
                    <textarea placeholder="Add workout trainer tips" aria-required="false"/>
                </label>
                <button className={styles.button}>Submit</button>
            </form>
        </div>
    )
}