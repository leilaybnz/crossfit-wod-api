"use server";

import { revalidatePath } from "next/cache";
import { deleteWorkout } from "./services/wod";

export async function deleteWorkoutAction(workoutId: string) {
  revalidatePath("/");
  await deleteWorkout(workoutId);
}
