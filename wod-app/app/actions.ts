"use server";

import { revalidatePath } from "next/cache";
import { deleteWorkout } from "./api/wod";

export async function deleteWorkoutAction(workoutId: string) {
  revalidatePath("/");
  return deleteWorkout(workoutId);
}
