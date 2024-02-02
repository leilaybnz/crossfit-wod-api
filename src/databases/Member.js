import DB from "./db.json" assert { type: "json" };
import { saveToDatabase } from "./utils.js";

export const getAllMembers = () => {
  try {
    return DB.members;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

export const getMemberForRecord = (recordId) => {
  try {
    const record = DB.records.filter((record) => record.id === recordId); // We filter all the records that are related to the workout id out of the query parameter.

    if (!record) {
      throw {
        status: 400,
        message: `Cannot find record with the id '${recordId}'`,
      };
    }

    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export const createNewMember = (newMember) => {
  const isAlreadyAdded =
    DB.members.findIndex((member) => member.name === newMember.name) > -1; //> /1 && if I try to add the same member it will return a 201 without the newly inserted member

  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Member with the name '${newMember.name}' already exists.`,
    };
  }

  try {
    DB.members.push(newMember);
    saveToDatabase(DB);
    return newMember;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

export const updateMember = (memberId, changes) => {
  try {
    const indexForUpdate = DB.members.findIndex(
      (member) => member.id === memberId
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Cannot find member with the id '${memberId}'`,
      };
    }

    const updatedMember = {
      ...DB.members[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("es-AR", {
        timeZone: "America/Buenos_Aires",
      }),
    };

    DB.members[indexForUpdate] = updatedMember;
    saveToDatabase(DB);
    return updatedMember;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export const deleteMember = (memberId) => {
  try {
    const indexForDeletion = DB.members.findIndex(
      (member) => member.id === memberId
    );

    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Cannot find member with the id '${memberId}'`,
      };
    }

    DB.members.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};
