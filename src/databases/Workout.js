import db from './db.json' assert {type: 'json'};
import { saveToDatabase } from './utils.js';

const getAllWorkouts = () => {
    return db.workouts;
}

const getOneWorkout = (workoutId) => {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);

    if (!workout) {
        return;
    }

    return workout;
}

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1; //> /1 && if I try to add the same workout it will return a 201 without the newly inserted workout
    
    if (isAlreadyAdded) {
        return;
    }

    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
}

const updateOneWorkout = (workoutId, changes) => {
    const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);

    if (indexForUpdate === -1) {
        return;
    }

    const updatedWorkout = {
        ...DB.workouts[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString('en-US', {timeZone: 'utc'})
    };

    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
}

const deleteOneWorkout = (workoutId) => {
    const indexForDeletion = DB.workouts.findIndex((workout) => workout.id === workoutId);

    if (indexForDeletion === -1) {
        return;
    }

    DB.workouts.splice(indexForDeletion, 1);
    saveToDatabase(DB);
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}