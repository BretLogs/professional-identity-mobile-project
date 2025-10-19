/**
 * Authentication Service - Handles authentication business logic
 * Following Clean Code principles with single responsibility
 */

import { AUTH_CONSTANTS, AuthResult, IAuthService } from '../models/Auth';
import { UserFactory, UserValidator } from '../models/User';

/**
 * Mock Authentication Service Implementation
 * Simulates authentication with proper error handling
 */
export class MockAuthService implements IAuthService {
  /**
   * Authenticates a user with username
   * @param username - The username to authenticate
   * @returns Promise<AuthResult> - Authentication result
   */
  async authenticateUser(username: string): Promise<AuthResult> {
    try {
      // Validate input
      if (!UserValidator.isValidUsername(username)) {
        return {
          success: false,
          error: 'Invalid username format'
        };
      }

      // Simulate network delay
      await this.simulateNetworkDelay();

      // Mock authentication - always succeeds for demo
      const user = UserFactory.createAnonymousUser(username.trim());
      
      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      };
    }
  }

  /**
   * Signs out the current user
   * @returns Promise<void>
   */
  async signOutUser(): Promise<void> {
    // Simulate network delay
    await this.simulateNetworkDelay();
    
    // In a real app, this would clear server-side sessions
    console.log('User signed out successfully');
  }

  /**
   * Simulates network delay for realistic UX
   * @private
   */
  private async simulateNetworkDelay(): Promise<void> {
    return new Promise(resolve => 
      setTimeout(resolve, AUTH_CONSTANTS.AUTH_DELAY_MS)
    );
  }
}

/**
 * Authentication Service Factory
 * Provides centralized service creation
 */
export class AuthServiceFactory {
  static createMockService(): IAuthService {
    return new MockAuthService();
  }
}
