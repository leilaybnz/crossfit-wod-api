"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import {
  Member,
  Workout,
  createNewMember,
  createNewWorkout,
  deleteMember,
  deleteWorkout,
  editWorkout,
} from "./services/wod";

interface EditWorkoutActionParams {
  workoutId: string;
  changes: Omit<Workout, "createdAt" | "id">;
}

export async function deleteWorkoutAction(workoutId: string) {
  revalidatePath("/");
  return deleteWorkout(workoutId);
}

export async function deleteMemberAction(memberId: string) {
  revalidatePath("/");
  return deleteMember(memberId);
}

export async function createWorkoutAction(
  newWorkout: Omit<Workout, "id" | "createdAt" | "updatedAt">
) {
  revalidatePath("/");
  return createNewWorkout({
    ...newWorkout,
    id: randomUUID(),
    createdAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
    updatedAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
  });
}

export async function createMemberAction(newMember: Member) {
  revalidatePath("/");
  return createNewMember({
    ...newMember,
    id: randomUUID(),
    createdAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
    updatedAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
  });
}

export async function editWorkoutAction({
  workoutId,
  changes,
}: EditWorkoutActionParams) {
  revalidatePath("/");
  return editWorkout({
    workoutId: workoutId,
    changes: {
      ...changes,
    },
    updatedAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
  });
}
