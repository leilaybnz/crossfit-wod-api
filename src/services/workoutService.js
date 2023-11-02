import { v4 as uuid } from "uuid";
import {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
} from "../databases/Workout.js";

export const getAllWorkoutsService = () => {
  try {
    const allWorkouts = getAllWorkouts();
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

export const getOneWorkoutService = (workoutId) => {
  try {
    const workout = getOneWorkout(workoutId);
    return workout;
  } catch (error) {
    throw error;
  }
};

export const createNewWorkoutService = (newWorkout) => {
  const workoutToInsert =
    //will add the remaining properties
    {
      ...newWorkout,
      id: uuid(),
      createdAt: new Date().toLocaleString("es-AR", {
        timeZone: "America/Buenos_Aires",
      }),
      updatedAt: new Date().toLocaleString("es-AR", {
        timeZone: "America/Buenos_Aires",
      }),
    };

  try {
    const createdWorkout = createNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

export const updateOneWorkoutService = (workoutId, changes) => {
  try {
    const updatedWorkout = updateOneWorkout(workoutId, changes);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

export const deleteOneWorkoutService = (workoutId) => {
  try {
    deleteOneWorkout(workoutId); //why not assign it to a const? why no return?
  } catch (error) {
    throw error;
  }
};
