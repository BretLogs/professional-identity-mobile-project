/**
 * Authentication Controller - Handles authentication business logic
 * Following MVC pattern and Clean Code principles
 */

import { UserValidator } from '../models/User';
import { useAuthStore } from '../stores/authStore';

/**
 * Authentication Controller Class
 * Encapsulates authentication business logic and validation
 */
export class AuthController {
  private authStore = useAuthStore;

  /**
   * Signs in a user with username validation
   * @param username - The username to authenticate
   * @returns Promise<boolean> - Success status
   */
  async signIn(username: string): Promise<boolean> {
    try {
      // Validate input
      if (!UserValidator.isValidUsername(username)) {
        this.authStore.getState().clearError();
        this.authStore.setState({ 
          error: 'Username must be between 1 and 50 characters' 
        });
        return false;
      }

      // Clear any previous errors
      this.authStore.getState().clearError();

      // Attempt authentication
      await this.authStore.getState().signIn(username);
      
      // Check if authentication was successful
      const state = this.authStore.getState();
      return state.isAuthenticated && state.user !== null;
    } catch (error) {
      console.error('AuthController.signIn error:', error);
      return false;
    }
  }

  /**
   * Signs out the current user
   * @returns Promise<boolean> - Success status
   */
  async signOut(): Promise<boolean> {
    try {
      await this.authStore.getState().signOut();
      return true;
    } catch (error) {
      console.error('AuthController.signOut error:', error);
      return false;
    }
  }

  /**
   * Gets the current user
   * @returns User | null - Current user or null
   */
  getCurrentUser() {
    return this.authStore.getState().user;
  }

  /**
   * Checks if user is authenticated
   * @returns boolean - Authentication status
   */
  isAuthenticated(): boolean {
    return this.authStore.getState().isAuthenticated;
  }

  /**
   * Gets the current loading state
   * @returns boolean - Loading status
   */
  isLoading(): boolean {
    return this.authStore.getState().isLoading;
  }

  /**
   * Gets the current error
   * @returns string | null - Error message or null
   */
  getError(): string | null {
    return this.authStore.getState().error;
  }

  /**
   * Clears the current error
   */
  clearError(): void {
    this.authStore.getState().clearError();
  }
}

/**
 * Authentication Controller Factory
 * Provides centralized controller creation
 */
export class AuthControllerFactory {
  static create(): AuthController {
    return new AuthController();
  }
}

/**
 * Global authentication controller instance
 * Singleton pattern for consistent state access
 */
export const authController = AuthControllerFactory.create();
