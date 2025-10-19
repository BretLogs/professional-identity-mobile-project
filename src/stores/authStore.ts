/**
 * Authentication Store - Custom store for authentication state management
 * Following Clean Code principles with clear separation of concerns
 */

import { AuthActions, AuthState } from '../models/Auth';
import { createStore } from './createStore';

/**
 * Authentication store implementation using custom store
 * Centralized state management for authentication
 */

// Initial state
const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// Actions - These will be implemented in the component using setState
const authActions: AuthActions = {
  signIn: async (username: string) => {
    // This will be implemented in the component
    console.log('Sign in:', username);
  },
  signOut: async () => {
    // This will be implemented in the component
    console.log('Sign out');
  },
  clearError: () => {
    // This will be implemented in the component
    console.log('Clear error');
  },
  setLoading: (loading: boolean) => {
    // This will be implemented in the component
    console.log('Set loading:', loading);
  },
};

const { StoreProvider: AuthStoreProvider, useStore: useAuthStore } = createStore(
  initialAuthState,
  authActions
);

export { AuthStoreProvider, useAuthStore };

/**
 * Authentication store selectors
 * Provides convenient access to specific state slices
 */
export const authSelectors = {
  getUser: (state: AuthState) => state.user,
  getIsLoading: (state: AuthState) => state.isLoading,
  getIsAuthenticated: (state: AuthState) => state.isAuthenticated,
  getError: (state: AuthState) => state.error,
  getAuthActions: (actions: AuthActions) => ({
    signIn: actions.signIn,
    signOut: actions.signOut,
    clearError: actions.clearError,
    setLoading: actions.setLoading,
  }),
};
