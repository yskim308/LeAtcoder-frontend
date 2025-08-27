export interface Task {
  _id: string;
  title: string;
  score: number;
  completed?: boolean;
}

export type Difficulty = 'all' | 'beginner' | 'easy' | 'medium' | 'hard' | 'expert';
export type Status = 'all' | 'completed' | 'uncompleted';
