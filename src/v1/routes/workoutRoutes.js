import express from "express";
import {
  getAllWorkoutsController,
  getOneWorkoutController,
  createNewWorkoutController,
  updateOneWorkoutController,
  deleteOneWorkoutController,
} from "../../controllers/workoutController.js";

import {
  getAllRecordsController,
  getRecordForWorkoutController,
  createNewRecordController,
  updateOneRecordController,
  deleteOneRecordController,
} from "../../controllers/recordController.js";

export const router = express.Router();

router.get("/", getAllWorkoutsController);

router.get("/records", getAllRecordsController);

router.get("/:workoutId", getOneWorkoutController);

router.get("/:workoutId/records", getRecordForWorkoutController);

router.post("/", createNewWorkoutController);

router.post("/:workoutId/records", createNewRecordController);

router.patch("/:workoutId", updateOneWorkoutController);

router.patch("/:workoutId/records/:recordId", updateOneRecordController);

router.delete("/:workoutId", deleteOneWorkoutController);

router.delete("/:workoutId/records/:recordId", deleteOneRecordController);//THROWS 200 BUT DOESNT DELETE
