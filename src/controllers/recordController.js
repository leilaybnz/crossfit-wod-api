import {
  getAllRecordsService,
  getRecordForWorkoutService,
  createNewRecordService,
  updateOneRecordService,
  deleteOneRecordService,
} from "../services/recordService.js";

export const getAllRecordsController = (req, res) => {
  try {
    const allRecords = getAllRecordsService();
    res.send({ status: "OK", data: allRecords });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

export const getRecordForWorkoutController = (req, res) => {
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
    const record = getRecordForWorkoutService(workoutId);
    res.send({ status: "OK", data: record });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const createNewRecordController = (req, res) => {
  const { body } = req;
  const memberURI = "/members/:memberId";

  if (!body.record) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'record'",
      },
    });
    return;
  }

  const newRecord = {
    workout: body.workout,
    record: body.record,
    member: memberURI,
    memberId: body.memberId
  };

  try {
    const createdRecord = createNewRecordService(newRecord);
    res.status(201).send({ status: "OK", data: createdRecord });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const updateOneRecordController = (req, res) => {
  const {
    body,
    params: { recordId },
  } = req;

  if (!recordId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter 'recordId' cannot be empty" },
      });
  }

  try {
    const updatedRecord = updateOneRecordService(recordId, body);
    res.send({ status: "OK", data: updatedRecord });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const deleteOneRecordController = (req, res) => {
  const {
    params: { recordId },
  } = req;

  if (!recordId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter 'recordId' cannot be empty" },
      });
  }

  const deletedRecord = deleteOneRecordService(recordId);
  res.send({ status: "OK", data: deletedRecord });
};
