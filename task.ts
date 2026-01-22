export type Priority = 'low' | 'medium' | 'high';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  subject: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  estimatedHours: number;
  completedHours: number;
  dependencies: string[]; // Array of task IDs this task depends on
  createdAt: string;
}

export interface DailyProgress {
  date: string;
  completedTasks: number;
  totalTasks: number;
  hoursStudied: number;
}

export interface SubjectProgress {
  subject: string;
  completed: number;
  pending: number;
  inProgress: number;
}
