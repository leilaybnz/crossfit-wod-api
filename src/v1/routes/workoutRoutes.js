import express from "express";
import 
    {getAllWorkouts, 
    getOneWorkout, 
    createNewWorkout, 
    updateOneWorkout, 
    deleteOneWorkout} 
from '../../controllers/workoutController.js';

export const router = express.Router();

router.get('/', getAllWorkouts);

router.get('/:workoutId', getOneWorkout);

router.post('/', createNewWorkout);

router.patch('/:workoutId', updateOneWorkout);

router.delete('/:workoutId', deleteOneWorkout);