import { v4 as uuid } from "uuid";
import {
  getAllMembers,
  getMemberForRecord,
  createNewMember,
  updateMember,
  deleteMember,
} from "../databases/Member.js";

export const getAllMembersService = () => {
  try {
    const allMembers = getAllMembers();
    return allMembers;
  } catch (error) {
    throw error;
  }
};

export const getMemberForRecordService = (recordId) => {
  try {
    const member = getMemberForRecord(recordId);
    return member;
  } catch (error) {
    throw error;
  }
};

export const createNewMemberService = (newMember, baseMemberURI) => {
  const id = uuid();

  const memberToInsert = {
    ...newMember,
    id,
    member: `${baseMemberURI}/${id}`,
    createdAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
    updatedAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
  };

  try {
    const createdMember = createNewMember(memberToInsert);
    return createdMember;
  } catch (error) {
    throw error;
  }
};

export const updateMemberService = (memberId, changes) => {
  try {
    const updatedMember = updateMember(memberId, changes);
    return updatedMember;
  } catch (error) {
    throw error;
  }
};

export const deleteMemberService = (memberId) => {
  try {
    deleteMember(memberId); //why not assign it to a const? why no return?
  } catch (error) {
    throw error;
  }
};
