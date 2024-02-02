import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/form.module.css";

export interface FormMemberProps {
  name: string;
  dateOfBirth: string;
  mail: string;
}

export interface PostMemberResponseData {
  status: string;
  data: MemberData;
}

export interface MemberData {
  name: string;
  dateOfBirth: string;
  mail: string;
  id: string;
  password: string;
}

function postMember(body: { name: string; dateOfBirth: string; mail: string }) {
  return fetch("http://localhost:5000/api/v1/members", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json() as Promise<PostMemberResponseData>);
}

export default function MemberForm() {
  const { reset, handleSubmit, register } = useForm<FormMemberProps>({
    defaultValues: {
      name: "",
      dateOfBirth: "",
      mail: "",
    },
  });

  const addMember: SubmitHandler<FormMemberProps> = ({
    name,
    dateOfBirth,
    mail,
  }) => {
    postMember({
      name: name,
      dateOfBirth: dateOfBirth,
      mail: mail,
    }).then(() => {
      reset();
    });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(addMember)}>
      <label className={styles.label}>
        Name:
        <input
          type="text"
          placeholder="Add member name"
          {...register("name", {
            required: true,
            minLength: 3,
          })}
        />
      </label>
      <label className={styles.label}>
        Birthday:
        <input
          type="date"
          placeholder="Add member birthday"
          {...register("dateOfBirth", {
            required: true,
          })}
        />
      </label>
      <label className={styles.label}>
        Mail:
        <input
          type="text"
          placeholder="Add member mail"
          {...register("mail", {
            required: true,
            minLength: 3,
          })}
        />
      </label>
      <button className={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
}
