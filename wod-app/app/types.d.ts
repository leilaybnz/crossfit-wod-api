import { Dispatch, SetStateAction } from "react";

export interface WorkoutType {
  name: string;
  mode: string;
  equipment: string;
  mobility: string,
  activation: string,
  exercises: string;
  trainerTips: string;
  id: string;
  setShouldRefresh:  Dispatch<SetStateAction<boolean>>;
}

export interface Member {
  name: string;
  gender: number;
  email: string;
  birthday?: string;
}
