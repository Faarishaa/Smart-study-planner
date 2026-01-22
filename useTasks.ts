import { useState, useCallback } from 'react';
import { Task, TaskStatus, Priority } from '@/types/task';
import { mockTasks } from '@/data/mockData';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
              completedHours:
                status === 'completed' ? task.estimatedHours : task.completedHours,
            }
          : task
      )
    );
  }, []);

  const getTaskById = useCallback(
    (id: string) => tasks.find((task) => task.id === id),
    [tasks]
  );

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => tasks.filter((task) => task.status === status),
    [tasks]
  );

  const getTasksByPriority = useCallback(
    (priority: Priority) => tasks.filter((task) => task.priority === priority),
    [tasks]
  );

  const getTasksBySubject = useCallback(
    (subject: string) => tasks.filter((task) => task.subject === subject),
    [tasks]
  );

  // Build adjacency matrix for task dependencies
  const getDependencyMatrix = useCallback(() => {
    const taskIds = tasks.map((t) => t.id);
    const matrix: number[][] = Array(tasks.length)
      .fill(null)
      .map(() => Array(tasks.length).fill(0));

    tasks.forEach((task, i) => {
      task.dependencies.forEach((depId) => {
        const j = taskIds.indexOf(depId);
        if (j !== -1) {
          matrix[j][i] = 1; // Edge from dependency to dependent task
        }
      });
    });

    return { matrix, taskIds };
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTaskById,
    getTasksByStatus,
    getTasksByPriority,
    getTasksBySubject,
    getDependencyMatrix,
  };
}
