import express from "express";
import apicache from "apicache";
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
  deleteMemberController,
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
  "/",
  cache("30 seconds"),
  workoutsCache.addToGroup,
  getAllWorkoutsController
);

router.get("/:workoutId", getOneWorkoutController);

router.post("/", workoutsCache.clearGroup, createNewWorkoutController);

router.patch(
  "/:workoutId",
  workoutsCache.clearGroup,
  updateOneWorkoutController
);

router.delete(
  "/:workoutId",
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

router.get("/", getAllMembersController); //Cannot GET /api/v1/members/

router.get(
  "/:workoutId/records/:recordId/member",
  getMemberForRecordController
);

router.post("/members/:memberId", createNewMemberController);

router.patch("/members/:memberId", updateMemberController);

router.delete("/members/:memberId", deleteMemberController);
