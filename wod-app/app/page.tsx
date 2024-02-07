import { getAllMembers, getAllWorkouts } from "./api/wod";
import Container from "./components/Container";

export default async function Home() {
  const [workouts, members] = await Promise.all([
    getAllWorkouts(),
    getAllMembers(),
  ]);

  return <Container members={members} workouts={workouts} />;
}
