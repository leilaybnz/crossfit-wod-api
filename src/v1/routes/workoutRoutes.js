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

import {
  getAllMembersController,
  getMemberForRecordController,
  createNewMemberController,
  updateMemberController,
  deleteMemberController
} from '../../controllers/memberController.js';

export const router = express.Router();

//WORKOUT ROUTES

router.get("/", getAllWorkoutsController);

router.get("/:workoutId", getOneWorkoutController);

router.post("/", createNewWorkoutController);

router.patch("/:workoutId", updateOneWorkoutController);

router.delete("/:workoutId", deleteOneWorkoutController);

//RECORDS ROUTES

router.get("/", getAllRecordsController);

router.get("/:workoutId/records", getRecordForWorkoutController);

router.post("/:workoutId/records", createNewRecordController);

router.patch("/:workoutId/records/:recordId", updateOneRecordController);

router.delete("/:workoutId/records/:recordId", deleteOneRecordController);//THROWS 200 BUT DOESNT DELETE

//MEMBERS ROUTES

router.get("/", getAllMembersController);

router.get("/:workoutId/records/:recordId/member", getMemberForRecordController);

router.post("/members/:memberId", createNewMemberController);

router.patch("/members/:memberId", updateMemberController);

router.delete("/members/:memberId", deleteMemberController);