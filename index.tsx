import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { SubjectPieChart } from '@/components/dashboard/SubjectPieChart';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import { Plus } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { tasks, addTask, updateTask, updateTaskStatus, deleteTask } = useTasks();

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'tasks' && 'My Tasks'}
                {activeTab === 'calendar' && 'Calendar'}
                {activeTab === 'analytics' && 'Analytics'}
                {activeTab === 'settings' && 'Settings'}
              </h2>
              <p className="text-muted-foreground">
                {activeTab === 'dashboard' && 'Track your study progress and manage tasks'}
                {activeTab === 'tasks' && 'Create and manage your study tasks'}
                {activeTab === 'calendar' && 'View your schedule'}
                {activeTab === 'analytics' && 'Detailed study analytics'}
                {activeTab === 'settings' && 'Customize your experience'}
              </p>
            </div>
            {(activeTab === 'dashboard' || activeTab === 'tasks') && (
              <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            )}
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <StatsCards tasks={tasks} />
              <div className="grid gap-6 lg:grid-cols-3">
                <ProgressChart />
                <SubjectPieChart />
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Recent Tasks
                </h3>
                <TaskList
                  tasks={tasks.slice(0, 6)}
                  onStatusChange={updateTaskStatus}
                  onEdit={handleEditTask}
                  onDelete={deleteTask}
                />
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <TaskList
              tasks={tasks}
              onStatusChange={updateTaskStatus}
              onEdit={handleEditTask}
              onDelete={deleteTask}
            />
          )}

          {activeTab === 'calendar' && (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground">Calendar view coming soon</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <ProgressChart />
              <SubjectPieChart />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground">Settings coming soon</p>
            </div>
          )}
        </main>
      </div>

      <TaskForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleCreateTask}
        editTask={editingTask}
      />
    </div>
  );
};

export default Index;
