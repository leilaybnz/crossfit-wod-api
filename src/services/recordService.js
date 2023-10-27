import { getRecordForWorkout } from "../databases/Record";

export const getRecordForWorkoutService = (workoutId) => {
    try {
       const record = getRecordForWorkout(workoutId);
        return record;
    } catch (error) {
        throw error;
    }
}