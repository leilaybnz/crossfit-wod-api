import { v4 as uuid } from 'uuid';
import {getAllWorkouts, 
        getOneWorkout, 
        createNewWorkout, 
        updateOneWorkout, 
        deleteOneWorkout} from '../databases/Workout.js';

export const getAllWorkoutsService = () => {
    const allWorkouts = getAllWorkouts();
    return allWorkouts;
}

export const getOneWorkoutService = (workoutId) => {
    const workout = getOneWorkout(workoutId);
    return workout;
}

export const createNewWorkoutService = (newWorkout) => {
    const workoutToInsert = //will add the remaining properties
    {...newWorkout, 
        id: uuid(),
    createdAt: new Date().toLocaleString('en-US', {timeZone: 'UTC'}),
    updatedAt: new Date().toLocaleString('en-US', {timeZone: 'utc'})
    };

    const createdWorkout = createNewWorkout(workoutToInsert);
    return createdWorkout;
}

export const updateOneWorkoutService = (workoutId, changes) => {
    const updatedWorkout = updateOneWorkout(workoutId, changes);
    return updatedWorkout;
}

export const deleteOneWorkoutService = (workoutId) => {
    deleteOneWorkout(workoutId); //why not assign it to a const? why no return?
}
