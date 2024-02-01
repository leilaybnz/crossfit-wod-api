import { v4 as uuid } from "uuid";
import {
  getAllRecords,
  getRecordForWorkout,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
} from "../databases/Record.js";

export const getAllRecordsService = () => {
  try {
    const allRecords = getAllRecords();
    return allRecords;
  } catch (error) {
    throw error;
  }
};

export const getRecordForWorkoutService = (workoutId) => {
  try {
    const record = getRecordForWorkout(workoutId);
    return record;
  } catch (error) {
    throw error;
  }
};

export const createNewRecordService = (newRecord) => {
  const recordToInsert = {
    ...newRecord,
    id: uuid(),
    createdAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
    updatedAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
  };

  try {
    const createdRecord = createNewRecord(recordToInsert);
    return createdRecord;
  } catch (error) {
    throw error;
  }
};

export const updateOneRecordService = (recordId, changes) => {
  try {
    const updatedRecord = updateOneRecord(recordId, changes);
    return updatedRecord;
  } catch (error) {
    throw error;
  }
};

export const deleteOneRecordService = (recordId) => {
  try {
    deleteOneRecord(recordId);
  } catch (error) {
    throw error;
  }
};
