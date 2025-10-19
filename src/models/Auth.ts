/**
 * Authentication Model - Represents authentication state and business logic
 * Following Clean Code principles with clear separation of concerns
 */

import { User } from './User';

export interface AuthState {
  readonly user: User | null;
  readonly isLoading: boolean;
  readonly isAuthenticated: boolean;
  readonly error: string | null;
}

export interface AuthActions {
  readonly signIn: (username: string) => Promise<void>;
  readonly signOut: () => Promise<void>;
  readonly clearError: () => void;
  readonly setLoading: (loading: boolean) => void;
}

export interface AuthStore extends AuthState, AuthActions {}

/**
 * Authentication result types for better type safety
 */
export type AuthResult = 
  | { success: true; user: User }
  | { success: false; error: string };

/**
 * Authentication service interface
 * Defines contract for authentication operations
 */
export interface IAuthService {
  authenticateUser(username: string): Promise<AuthResult>;
  signOutUser(): Promise<void>;
}

/**
 * Authentication constants
 * Centralized configuration values
 */
export const AUTH_CONSTANTS = {
  MIN_USERNAME_LENGTH: 1,
  MAX_USERNAME_LENGTH: 50,
  AUTH_DELAY_MS: 500,
  ANONYMOUS_USER_ID: 'anonymous',
} as const;
