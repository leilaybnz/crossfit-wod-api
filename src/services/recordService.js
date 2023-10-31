import { getRecordForWorkout } from "../databases/Record.js";

export const getRecordForWorkoutService = (workoutId) => {
    try {
       const record = getRecordForWorkout(workoutId);
        return record;
    } catch (error) {
        throw error;
    }
}