import { MemberType, WorkoutType } from "../types";

const baseUrl = "http://localhost:5000/api/v1/";

async function get(url: string) {
  let response: Response;

  try {
    response = await fetch(url);
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }

  if (!response.ok || response.status !== 200) {
    throw new Error(
      `An error has occurred fetching ${url}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getAllWorkouts() {
  const jsonData = await get(`${baseUrl}/workouts`);

  return jsonData.allWorkouts as WorkoutType[];
}

export async function getAllMembers() {
  const jsonData = await get(`${baseUrl}/members`);

  return jsonData.allMembers as MemberType[];
}
