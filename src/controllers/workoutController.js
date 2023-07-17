const workoutService = require("../services/workoutService");

export const getAllWorkouts = (req, res) => {
    const allWorkouts = workoutService.getAllWorkoutsService();
    res.send({status: 'OK', data: allWorkouts});
};

export const getOneWorkout = (req, res) => {
    const {
        params: {workoutId}
    } = req;

    if(!workoutId) {
        return;
    }

    const workout = workoutService.getOneWorkoutService(workoutId);
    res.send({status: "OK", data: workout});
};

export const createNewWorkout = (req, res) => {
    const {body} = req;

    if (!body.name || 
       !body.mode ||
       !body.equipment ||
       !body.exercises ||
       !body.trainerTips) 
    {
        return; //no retorna nada?
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips
    };

    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({status: 'OK', data: createdWorkout});
};

export const updateOneWorkout = (req, res) => {
    const {
        body,
        params: {workoutId}
    } = req;

    if (!workoutId) {
        return;
    }

    const updatedWorkout = workoutService.updateOneWorkoutService(workoutId, body);
    res.send({status: "OK", data: updatedWorkout});
};

export const deleteOneWorkout = (req, res) => {
    const {
        params: {workoutId}
    } = req;

    if (!workoutId) {
        return;
    }
    
    workoutService.deleteOneWorkoutService(workoutId);
    res.status(204).send({status: "OK"});
};
