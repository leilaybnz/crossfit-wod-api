"use client";
import { useEffect, useState } from "react";
import { getAllMembers, getAllWorkouts } from "../api/wod";
import styles from "../styles/container.module.css";
import { MemberType, WorkoutType } from "../types";
import Button from "./Button";
import CreateButton from "./CreateButton";
import Member from "./Member";
import MemberForm from "./MemberForm";
import Workout from "./Workout";
import WorkoutForm from "./WorkoutForm";

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

export default function Container() {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [isShownWorkout, setIsShownWorkout] = useState(false);
  const [isShownMember, setIsShownMember] = useState(false);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    Promise.all([getAllWorkouts(), getAllMembers()]).then(
      ([workoutsJson, membersJson]) => {
        setWorkouts(workoutsJson);
        setMembers(membersJson);
      }
    );
  }, [shouldRefresh]);

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
          <Workout
            workout={workout}
            key={i}
            setShouldRefresh={setShouldRefresh}
          />
        ))}
      </Section>
      <Section isShown={isShownMember}>
        {members.map((member, i) => (
          <Member member={member} key={i} setShouldRefresh={setShouldRefresh} />
        ))}
      </Section>
      <CreateButton onClick={handleClickCreateWorkoutBtn} title="workout" />
      <CreateButton onClick={handleClickCreateMemberBtn} title="member" />
      {showWorkoutForm && <WorkoutForm />}
      {showMemberForm && <MemberForm />}
    </>
  );
}
