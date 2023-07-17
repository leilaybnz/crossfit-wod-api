// import express from "express";
const express = require("express");
// import 
//     {getAllWorkouts, 
//     getOneWorkout, 
//     createNewWorkout, 
//     updateOneWorkout, 
//     deleteOneWorkout} 
// from '../../controllers/workoutController.js';

const workoutController = require("../../controllers/workoutController");

const router = express.Router();

router.get('/', workoutController.getAllWorkouts);

router.get('/:workoutId', workoutController.getOneWorkout);

router.post('/', workoutController.createNewWorkout);

router.patch('/:workoutId', workoutController.updateOneWorkout);

router.delete('/:workoutId', workoutController.deleteOneWorkout);

module.exports = router;