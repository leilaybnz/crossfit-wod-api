"use server"

import { revalidatePath } from "next/cache"
import { deleteMember, deleteWorkout } from "./api/wod";

export async function deleteWorkoutAction(workoutId: string) {
    revalidatePath("/");
    return deleteWorkout(workoutId);
}

export async function deleteMemberAction(memberId:string) {
    revalidatePath("/");
    return deleteMember(memberId);
}