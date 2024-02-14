import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/form.module.css";

export interface FormMemberProps {
  name: string;
  dateOfBirth: string;
  mail: string;
}

export interface PatchMemberResponseData {
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

function patchMember(body: {
  name: string;
  dateOfBirth: string;
  mail: string;
}) {
  return fetch("http://localhost:5000/api/v1/members", {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json() as Promise<PatchMemberResponseData>);
}

export default function EditMemberForm() {
  const { reset, handleSubmit, register } = useForm<FormMemberProps>({
    defaultValues: {
      name: "",
      dateOfBirth: "",
      mail: "",
    },
  });

  const editMember: SubmitHandler<FormMemberProps> = ({
    name,
    dateOfBirth,
    mail,
  }) => {
    patchMember({
      name: name,
      dateOfBirth: dateOfBirth,
      mail: mail,
    }).then(() => {
      reset();
    });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(editMember)}>
      <label className={styles.label}>
        Name:
        <input
          type="text"
          placeholder="Edit member name"
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
          placeholder="Edit member birthday"
          {...register("dateOfBirth", {
            required: true,
          })}
        />
      </label>
      <label className={styles.label}>
        Mail:
        <input
          type="text"
          placeholder="Edit member mail"
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
