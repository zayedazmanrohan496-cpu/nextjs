
export interface ICard {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  caloriesBurned: number;
  sets: number;
  reps: string; // string because it can be a range like "6-8" or time like "30-45s"
  rating: number;
  description: string;
  instructions: string[];
}