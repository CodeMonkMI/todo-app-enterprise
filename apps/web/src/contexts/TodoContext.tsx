
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Todo, CreateTodoData, UpdateTodoData } from '@/types/todo';
import { useAuth } from './AuthContext';

interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  createTodo: (data: CreateTodoData) => Promise<void>;
  updateTodo: (id: string, data: UpdateTodoData) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  refreshTodos: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Mock todos storage
const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the todo app',
    completed: false,
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review user management features',
    description: 'Test all admin functionalities',
    completed: true,
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Prepare demo presentation',
    description: 'Create slides for stakeholder demo',
    completed: false,
    userId: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshTodos = () => {
    if (!user) {
      setTodos([]);
      return;
    }

    // Filter todos for current user only
    const userTodos = mockTodos.filter(todo => todo.userId === user.id);
    setTodos(userTodos);
  };

  useEffect(() => {
    refreshTodos();
  }, [user]);

  const createTodo = async (data: CreateTodoData) => {
    if (!user) return;
    
    setIsLoading(true);
    
    const newTodo: Todo = {
      id: Math.random().toString(),
      title: data.title,
      description: data.description,
      completed: false,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockTodos.push(newTodo);
    refreshTodos();
    setIsLoading(false);
  };

  const updateTodo = async (id: string, data: UpdateTodoData) => {
    if (!user) return;
    
    setIsLoading(true);
    
    const todoIndex = mockTodos.findIndex(todo => todo.id === id && todo.userId === user.id);
    if (todoIndex !== -1) {
      mockTodos[todoIndex] = {
        ...mockTodos[todoIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
    }

    refreshTodos();
    setIsLoading(false);
  };

  const deleteTodo = async (id: string) => {
    if (!user) return;
    
    setIsLoading(true);
    
    const todoIndex = mockTodos.findIndex(todo => todo.id === id && todo.userId === user.id);
    if (todoIndex !== -1) {
      mockTodos.splice(todoIndex, 1);
    }

    refreshTodos();
    setIsLoading(false);
  };

  const value: TodoContextType = {
    todos,
    isLoading,
    createTodo,
    updateTodo,
    deleteTodo,
    refreshTodos,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
