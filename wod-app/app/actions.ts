"use server";

import { revalidatePath } from "next/cache";
import {
  deleteWorkout,
  deleteMember,
  createNewWorkout,
  createNewMember,
} from "./services/wod";

export async function deleteWorkoutAction(workoutId: string) {
  revalidatePath("/");
  return deleteWorkout(workoutId);
}

export async function deleteMemberAction(memberId: string) {
  revalidatePath("/");
  return deleteMember(memberId);
}

export async function createWorkoutAction() {
  revalidatePath("/");
  return createNewWorkout(newWorkout);
}

export async function createMemberAction() {
  revalidatePath("/");
  return createNewMember(newMember);
}
