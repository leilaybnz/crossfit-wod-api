import {
  getAllWorkoutsService,
  getOneWorkoutService,
  createNewWorkoutService,
  updateOneWorkoutService,
  deleteOneWorkoutService,
} from "../services/workoutService.js";

export const getAllWorkoutsController = (req, res) => {
  const { mode } = req.query;

  try {
    const allWorkouts = getAllWorkoutsService({ mode });
    res.send({ allWorkouts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const getOneWorkoutController = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':workoutId' can not be empty" },
      });
  }

  try {
    const workout = getOneWorkoutService(workoutId);
    res.send({ status: "OK", data: workout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const createNewWorkoutController = (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.mobility ||
    !body.activation ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'mobility', 'activation', 'exercises', 'trainerTips'",
      },
    });
    return;
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    mobility: body.mobility,
    activation: body.activation,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  try {
    const createdWorkout = createNewWorkoutService(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const updateOneWorkoutController = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter 'workoutId' cannot be empty" },
      });
  }

  try {
    const updatedWorkout = updateOneWorkoutService(workoutId, body);
    res.send({ status: "OK", data: updatedWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const deleteOneWorkoutController = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter 'workoutId' cannot be empty" },
      });
  }

  const deletedWorkout = deleteOneWorkoutService(workoutId);
  res.send({ status: "OK", data: deletedWorkout });
};
