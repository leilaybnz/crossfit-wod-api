import { kv } from "@vercel/kv";

export interface CrossfitDatabase {
  workouts: Workout[];
  members: Member[];
  records: Record[];
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

export interface Record {
  workout: string;
  record: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  memberId?: string;
  member: string;
}

export interface Workout {
  name: string;
  mode: string;
  equipment: string[];
  exercises: string[];
  trainerTips: string[];
  id: string;
  createdAt: string;
  updatedAt: string;
  mobility?: string[];
  activation?: string[];
}

async function getDatabase() {
  return (await kv.get("crossfit-db")) as CrossfitDatabase;
}

async function saveToDatabase(db: CrossfitDatabase) {
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
