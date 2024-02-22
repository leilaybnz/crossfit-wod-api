"use server";

import { revalidatePath } from "next/cache";
import {
  deleteWorkout,
  deleteMember,
  createNewWorkout,
  createNewMember,
  Member,
  Workout,
} from "./services/wod";
import { randomUUID } from "crypto";

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
  return createNewMember(newMember);
}
