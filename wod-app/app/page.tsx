import { getAllMembers, getAllWorkouts } from "./services/wod";
import Container from "./components/Container";

export default async function Home() {
  const [workouts, members] = await Promise.all([
    getAllWorkouts(),
    getAllMembers(),
  ]);

  return <Container workouts={workouts} members={members} />;
}
