import DB from "./db.json" assert { type: "json" };
import { saveToDatabase } from "./utils.js";

export const getAllRecords = () => {
  try {
    return DB.records;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

export const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId); // We filter all the records that are related to the workout id out of the query parameter.

    if (!record) {
      throw {
        status: 400,
        message: `Cannot find workout with the id '${workoutId}'`,
      };
    }

    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export const createNewRecord = (newRecord) => {
  try {
    DB.records.push(newRecord);
    saveToDatabase(DB);
    return newRecord;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

export const updateOneRecord = (recordId, changes) => {
  
  try {
    const indexForUpdate = DB.records.findIndex(
      (record) => record.id === recordId
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Cannot find record with the id ${recordId}`,
      };
    }

    const updatedRecord = {
      ...DB.records[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("es-AR", {
        timeZone: "America/Buenos_Aires",
      }),
    };

    DB.records[indexForUpdate] = updatedRecord;
    saveToDatabase(DB);
    return updatedRecord;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export const deleteOneRecord = (recordId) => {
  try {
    const indexForDeletion = DB.records.findIndex((record) => 
    record.id === recordId);

    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Cannot find record with the id: '${recordId}'`,
      };
    }

    DB.records.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};
