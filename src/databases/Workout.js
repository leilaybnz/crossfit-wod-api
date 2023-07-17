import db from './db.json' assert {type: 'json'};
import { saveToDatabase } from './utils.js';

export const getAllWorkouts = () => {
    return db.workouts;
}

export const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1; //> /1 && if I try to add the same workout it will return a 201 without the newly inserted workout
    
    if (isAlreadyAdded) {
        return;
    }

    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
}
