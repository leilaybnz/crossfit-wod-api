import apicache from "apicache";
import express from "express";
import {
  createNewWorkoutController,
  deleteOneWorkoutController,
  getAllWorkoutsController,
  getOneWorkoutController,
  updateOneWorkoutController,
} from "../../controllers/workoutController.js";

import {
  createNewRecordController,
  deleteOneRecordController,
  getAllRecordsController,
  getRecordForWorkoutController,
  updateOneRecordController,
} from "../../controllers/recordController.js";

import {
  createNewMemberController,
  deleteMemberController,
  getAllMembersController,
  getMemberForRecordController,
  updateMemberController,
} from "../../controllers/memberController.js";

export const router = express.Router();
const cache = apicache.middleware;

function groupCacheBy(key) {
  return (req, res, next) => {
    req.apicacheGroup = "workouts";
    next();
  };
}

function clearCacheKey(key) {
  return (req, res, next) => {
    apicache.clear(key);
    next();
  };
}

const workoutsCache = {
  addToGroup: groupCacheBy("workouts"),
  clearGroup: clearCacheKey("workouts"),
};

//WORKOUT ROUTES

router.get(
  "/workouts/",
  cache("30 seconds"),
  workoutsCache.addToGroup,
  getAllWorkoutsController
);

router.get("/workouts/:workoutId", getOneWorkoutController);

router.post("/workouts/", workoutsCache.clearGroup, createNewWorkoutController);

router.patch(
  "/workouts/:workoutId",
  workoutsCache.clearGroup,
  updateOneWorkoutController
);

router.delete(
  "/workouts/:workoutId",
  workoutsCache.clearGroup,
  deleteOneWorkoutController
);

//RECORDS ROUTES

router.get("/records/", getAllRecordsController); //Cannot GET /api/v1/records/

router.get("/:workoutId/records", getRecordForWorkoutController);

router.post("/:workoutId/records", createNewRecordController);

router.patch("/:workoutId/records/:recordId", updateOneRecordController);

router.delete("/:workoutId/records/:recordId", deleteOneRecordController); //THROWS 200 BUT DOESNT DELETE

//MEMBERS ROUTES

router.get("/members/", getAllMembersController);

router.get(
  "/:workoutId/records/:recordId/member",
  getMemberForRecordController
);

router.post("/members/", createNewMemberController);

router.patch("/members/:memberId", updateMemberController);

router.delete("/members/:memberId", deleteMemberController);
