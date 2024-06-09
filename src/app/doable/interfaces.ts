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
