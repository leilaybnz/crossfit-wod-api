import db from './db.json' assert {type: 'json'};
import { saveToDatabase } from './utils.js';

export const getAllWorkouts = () => {
    return db.workouts;
}

export const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1; //> /1
    
    if (isAlreadyAdded) {
        return;
    }

    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
}
