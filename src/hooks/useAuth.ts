/**
 * Authentication Hook - Custom hook for authentication state and actions
 * Following Clean Code principles with clear separation of concerns
 */

import { AuthServiceFactory } from '../services/AuthService';
import { useAuthStore } from '../stores/authStore';

/**
 * Custom hook for authentication functionality
 * Provides clean interface to authentication state and actions
 */
export const useAuth = () => {
  const { state, setState } = useAuthStore();

  const signIn = async (username: string) => {
    try {
      setState({ isLoading: true, error: null });

      const authService = AuthServiceFactory.createMockService();
      const result = await authService.authenticateUser(username);

      if (result.success && result.user) {
        setState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Authentication failed',
        });
      }
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      });
    }
  };

  const signOut = async () => {
    try {
      setState({ isLoading: true, error: null });

      const authService = AuthServiceFactory.createMockService();
      await authService.signOutUser();

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign out failed',
      });
    }
  };

  const clearError = () => {
    setState({ error: null });
  };

  return {
    // State
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    error: state.error,

    // Actions
    signIn,
    signOut,
    clearError,
  };
};

/**
 * Authentication hook with additional utilities
 * Provides extended functionality for complex authentication scenarios
 */
export const useAuthExtended = () => {
  const auth = useAuth();

  return {
    ...auth,
    
    // Additional utilities
    isAnonymous: () => auth.user?.id === 'anonymous',
    hasValidSession: () => auth.isAuthenticated && auth.user !== null,
    getDisplayName: () => auth.user?.name || 'Guest',
    getUsername: () => auth.user?.username || '',
  };
};
