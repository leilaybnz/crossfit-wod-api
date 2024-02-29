import { kv } from "@vercel/kv";

export interface CrossfitDatabase {
  workouts: Workout[];
  members: Member[];
}
export interface Workout {
  name: string;
  mode: string;
  equipment: string[];
  exercises: string[];
  trainerTips?: string[];
  id: string;
  mobility?: string[];
  activation?: string[];
  updatedAt: string;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  gender: Gender;
  dateOfBirth: string;
  email: string;
  password: string;
  member?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Gender = "female" | "male";

interface EditWorkoutParams {
  workoutId: string;
  updatedAt: string;
  changes: Omit<Workout, "createdAt" | "updatedAt" | "id">;
}

interface EditMemberParams {
  memberId: string;
  updatedAt: string;
  changes: Omit<Member, "createdAt" | "updatedAt" | "id">;
}

async function getDatabase() {
  return (await kv.get("crossfit-db")) as CrossfitDatabase;
}

export async function saveToDatabase(db: CrossfitDatabase) {
  await kv.set("crossfit-db", JSON.stringify(db, null, 2));
}

export async function getAllWorkouts() {
  return (await getDatabase()).workouts;
}

export async function getAllMembers() {
  return (await getDatabase()).members;
}

export async function deleteWorkout(workoutId: string) {
  const db = await getDatabase();

  const indexForDeletion = db.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForDeletion === -1) {
    throw new Error(`Cannot find workout with the id '${workoutId}'`);
  }

  db.workouts.splice(indexForDeletion, 1);

  await saveToDatabase(db);
}

export async function deleteMember(memberId: string) {
  const db = await getDatabase();

  const indexForDeletion = db.members.findIndex(
    (member) => member.id === memberId
  );

  if (indexForDeletion === -1) {
    throw new Error(`Cannot find member with the id '${memberId}'`);
  }

  db.members.splice(indexForDeletion, 1);

  await saveToDatabase(db);
}

export class AlreadyExistsError extends Error {}

export async function createNewWorkout(newWorkout: Workout) {
  const db = await getDatabase();

  const isAlreadyAdded =
    db.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

  if (isAlreadyAdded) {
    throw new AlreadyExistsError(
      `Workout with the name '${newWorkout.name}' already exists.`
    );
  }

  db.workouts.push(newWorkout);
  await saveToDatabase(db);

  return newWorkout;
}

export async function createNewMember(newMember: Member) {
  const db = await getDatabase();

  const isAlreadyAdded =
    db.members.findIndex((member) => member.name === newMember.name) > -1;

  if (isAlreadyAdded) {
    throw new AlreadyExistsError(
      `Member with the name '${newMember.name}' already exists.`
    );
  }

  db.members.push(newMember);
  await saveToDatabase(db);

  return newMember;
}

export async function editWorkout({ workoutId, changes }: EditWorkoutParams) {
  const db = await getDatabase();

  const isAlreadyAdded =
    db.workouts.findIndex((workout) => workout.name === changes.name) > -1;

  if (isAlreadyAdded) {
    throw new AlreadyExistsError(
      `Workout with the name '${changes.name}' already exists.`
    );
  }

  const indexForUpdate = db.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForUpdate === -1) {
    throw {
      status: 400,
      message: `Cannot find workout with the id '${workoutId}'`,
    };
  }

  const updatedWorkout = {
    ...db.workouts[indexForUpdate],
    ...changes,
  };

  db.workouts[indexForUpdate] = updatedWorkout;
  await saveToDatabase(db);
  return updatedWorkout;
}

export async function editMember({ memberId, changes }: EditMemberParams) {
  const db = await getDatabase();

  const isAlreadyAdded =
    db.members.findIndex((member) => member.name === changes.name) > -1;

  if (isAlreadyAdded) {
    throw new AlreadyExistsError(
      `Member with the name '${changes.name}' already exists`
    );
  }

  const indexForUpdate = db.members.findIndex(
    (member) => member.id === memberId
  );

  if (indexForUpdate === -1) {
    throw {
      status: 400,
      message: `Cannot find member with the id '${memberId}'`,
    };
  }

  const updatedMember = {
    ...db.members[indexForUpdate],
    ...changes,
  };

  db.members[indexForUpdate] = updatedMember;
  await saveToDatabase(db);
  return updatedMember;
}
