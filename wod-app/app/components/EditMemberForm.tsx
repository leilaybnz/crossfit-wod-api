import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/form.module.css";
import { MemberType } from "../types";
import { editMemberAction } from "../actions";
import { Gender } from "../services/wod";

export interface EditFormMemberProps {
  name: string;
  dateOfBirth: string;
  mail: string;
  id: string;
  password: string;
  gender: Gender;
  updatedAt: string;
}

export interface PatchMemberResponseData {
  status: string;
  data: MemberData;
}

export interface MemberData {
  member: MemberType;
}

export default function EditMemberForm({ member }: MemberData) {
  const methods = useForm<EditFormMemberProps>({
    defaultValues: {
      name: member.name,
      dateOfBirth: member.dateOfBirth,
      mail: member.email,
    },
  });

  const { reset, handleSubmit, register } = methods;

  const editMember: SubmitHandler<EditFormMemberProps> = ({
    name,
    dateOfBirth,
    mail,
    password,
    gender,
    id,
    updatedAt,
  }) => {
    editMemberAction({
      memberId: id,
      changes: {
        name: name,
        dateOfBirth: dateOfBirth,
        mail: mail,
        password: password,
        gender: gender,
        updatedAt: updatedAt,
      },
    }).then(() => {
      reset();
    });
  };
  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  );
}
