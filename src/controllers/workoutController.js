import { getAllWorkoutsService, 
        getOneWorkoutService, 
        createNewWorkoutService, 
        updateOneWorkoutService, 
        deleteOneWorkoutService } 
from "../services/workoutService.js";

export const getAllWorkouts = (req, res) => {
    try {
        const allWorkouts = getAllWorkoutsService();
        res.send({status: 'OK', data: allWorkouts});
    } catch (error) {
        res
        .status(error?.status || 500)
        .send(
            {status: 'FAILED', data: {error: error?.message || error }}
        );
    }

};

export const getOneWorkout = (req, res) => {
    const {
        params: {workoutId}
    } = req;

    if(!workoutId) {
       res
       .status(error?.status || 500)
       .send(
        {status: 'FAILED', data: {error: "Parameter ':workoutId' can not be empty"}}
       );
    }

    try {
        const workout = getOneWorkoutService(workoutId);
        res.send({status: "OK", data: workout});
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({status: 'FAILED', data: {error: error?.message || error}})
    }

};

export const createNewWorkout = (req, res) => {
    const {body} = req;

    if (!body.name || 
       !body.mode ||
       !body.equipment ||
       !body.exercises ||
       !body.trainerTips) 
    {
        res.status(400).send({
                status: "FAILED",
                data: {
                    error: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'"
                }
            });
        return;
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips
    };

     try {
        const createdWorkout = createNewWorkoutService(newWorkout);
        res
        .status(201)
        .send({status: 'OK', data: createdWorkout});
    } catch (error) {
        res
        .status(error?.status || 500)
        .send(
            {status: 'FAILED', data: {error: error?.message || error }});
    }
};

export const updateOneWorkout = (req, res) => {
    const {
        body,
        params: {workoutId}
    } = req;

    if (!workoutId) {
        res
        .status(400)
        .send({status: 'FAILED', data: {error: "Parameter 'workoutId' cannot be empty"}});
    }

    try {
        const updatedWorkout = updateOneWorkoutService(workoutId, body);
        res.send({status: "OK", data: updatedWorkout});
    } catch(error) {
        res
        .status(error?.status || 500)
        .send({status: 'FAILED', data: {error: error?.message || error}});
    }

};

export const deleteOneWorkout = (req, res) => {
    const {
        params: {workoutId}
    } = req;

    if (!workoutId) {
        res
        .status(400)
        .send({status: 'FAILED', data: {error: "Parameter 'workoutId' cannot be empty"}});
    }

    const deletedWorkout = deleteOneWorkoutService(workoutId);
    res.send({status: "OK", data: deletedWorkout});
};
