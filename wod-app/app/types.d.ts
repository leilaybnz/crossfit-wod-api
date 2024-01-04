export interface WorkoutType {
  name: string;
  mode: string;
  equipment: string;
  mobility: string,
  activation: string,
  exercises: string;
  trainerTips: string;
  id: string;
}

export interface Member {
  name: string;
  gender: number;
  email: string;
  birthday?: string;
}
