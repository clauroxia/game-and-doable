// User
export interface User {
  email: string;
}

export interface Credentials {
  email: User['email'];
  password: string;
}

export interface AuthState {
  currentUser: User | null,
  token: string | null,
  error: string | null,
}

export type TokenResponse = { token: string };

// Tasks
export interface Task {
  title: string;
  due_date: string;
}

export interface TaskEdited {
  important: boolean;
  completed: boolean;
}

export type TaskResponse = Task & {
  id: number;
  important: boolean;
  completed: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
}
