import Container from "./components/Container";
import { getAllMembers, getAllWorkouts } from "./services/wod";

export default async function Home() {
  const [workouts, members] = await Promise.all([
    getAllWorkouts(),
    getAllMembers(),
  ]);

  return <Container members={members} workouts={workouts} />;
}
