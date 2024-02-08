"use client";
import Workout from "./Workout";
import Member from "./Member";
import styles from "../styles/container.module.css";
import { useState } from "react";
import { MemberType, WorkoutType } from "../types";
import Button from "./Button";
import CreateButton from "./CreateButton";
import WorkoutForm from "./WorkoutForm";
import MemberForm from "./MemberForm";

function Section({
  isShown,
  children,
}: {
  isShown: boolean;
  children: React.ReactNode;
}) {
  if (!isShown) {
    return null;
  }

  return <section className={styles.container}>{children}</section>;
}

interface ContainerProps {
  workouts: WorkoutType[];
  members: MemberType[];
}

export default function Container({ workouts, members }: ContainerProps) {
  const [isShownWorkout, setIsShownWorkout] = useState(false);
  const [isShownMember, setIsShownMember] = useState(false);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);

  const handleClickWorkout = () => {
    setIsShownWorkout(!isShownWorkout);
  };

  const handleClickMember = () => {
    setIsShownMember(!isShownMember);
  };

  const handleClickCreateWorkoutBtn = () => {
    setShowWorkoutForm(!showWorkoutForm);
  };

  const handleClickCreateMemberBtn = () => {
    setShowMemberForm(!showMemberForm);
  };

  return (
    <>
      {/* <pre>{JSON.stringify(members, null, 2)}</pre> */}
      <Button title="workouts" onClick={handleClickWorkout} />
      <Button title="members" onClick={handleClickMember} />
      <Section isShown={isShownWorkout}>
        {workouts.map((workout, i) => (
          <Workout workout={workout} key={i} />
        ))}
      </Section>
      <Section isShown={isShownMember}>
        {members.map((member, i) => (
          <Member member={member} key={i} />
        ))}
      </Section>
      <CreateButton onClick={handleClickCreateWorkoutBtn} title="workout" />
      <CreateButton onClick={handleClickCreateMemberBtn} title="member" />
      {showWorkoutForm && <WorkoutForm />}
      {showMemberForm && <MemberForm />}
    </>
  );
}
