import {
  getAllMembersService,
  getMemberForRecordService,
  createNewMemberService,
  updateMemberService,
  deleteMemberService,
} from "../services/memberService.js";

export const getAllMembersController = (req, res) => {
  try {
    const allMembers = getAllMembersService();
    res.send({ status: "OK", data: allMembers });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

export const getMemberForRecordController = (req, res) => {
  const {
    params: { recordId },
  } = req;

  if (!recordId) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: "Parameter ':recordId' can not be empty" },
    });
  }

  try {
    const member = getMemberForRecordService(recordId);
    res.send({ status: "OK", data: member });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const createNewMemberController = (req, res) => {
  const { body } = req;
  const memberURI = "/members/:memberId";

  if (!body.name) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name'",
      },
    });
    return;
  }

  const newMember = {
    name: body.name,
    gender: body.gender,
    member: memberURI,
    dateOfBirth: body.dateOfBirth,
    email: body.email,
    password: body.password,
  };

  try {
    const createdMember = createNewMemberService(newMember);
    res.status(201).send({ status: "OK", data: createdMember });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const updateMemberController = (req, res) => {
  const {
    body,
    params: { memberId },
  } = req;

  if (!memberId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter 'memberId' cannot be empty" },
    });
  }

  try {
    const updatedMember = updateMemberService(memberId, body);
    res.send({ status: "OK", data: updatedMember });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const deleteMemberController = (req, res) => {
  const {
    params: { memberId },
  } = req;

  if (!memberId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter 'memberId' cannot be empty" },
    });
  }

  const deletedMember = deleteMemberService(memberId);
  res.send({ status: "OK", data: deletedMember });
};
