import { v4 as uuid } from 'uuid';
import {getAllWorkouts as Workout} from '../databases/Workout.js';

const getAllWorkoutsService = () => {
    const allWorkouts = Workout();
    return allWorkouts;
}

const getOneWorkoutService = (workoutId) => {
    const workout = Workout.getOneWorkout(workoutId);
    return workout;
}

const createNewWorkoutService = (newWorkout) => {
    const workoutToInsert = //will add the remaining properties
    {...newWorkout, 
        id: uuid(),
    createdAt: new Date().toLocaleString('en-US', {timeZone: 'UTC'}),
    updatedAt: new Date().toLocaleString('en-US', {timeZone: 'utc'})
    };

    const createdWorkout = Workout.createNewWorkout(workoutToInsert);
    return createdWorkout;
}

const updateOneWorkoutService = (workoutId, changes) => {
    const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
}

const deleteOneWorkoutService = (workoutId) => {
    Workout.deleteOneWorkout(workoutId); //why not assign it to a const? why no return?
}

module.exports = { 
    getAllWorkoutsService, 
    getOneWorkoutService, 
    createNewWorkoutService, 
    updateOneWorkoutService, 
    deleteOneWorkoutService
};