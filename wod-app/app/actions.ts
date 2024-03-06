"use server";

import { revalidatePath } from "next/cache";
import {
  deleteWorkout,
  deleteMember,
  createNewWorkout,
  createNewMember,
  Member,
  Workout,
  editWorkout,
  editMember,
} from "./services/wod";
import { randomUUID } from "crypto";
import { signIn } from 'next-auth/react';

interface EditWorkoutActionParams {
  workoutId: string;
  changes: Omit<Workout, "createdAt" | "id">;
}

interface EditMemberActionParams {
  memberId: string;
  changes: Omit<Member, "createdAt" | "id">;
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

export async function editMemberAction({
  memberId,
  changes,
}: EditMemberActionParams) {
  revalidatePath("/");
  return editMember({
    memberId: memberId,
    changes: {
      ...changes,
    },
    updatedAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
  });
}

 
export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}