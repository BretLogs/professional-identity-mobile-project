/**
 * User Model - Represents user data structure and business logic
 * Following Clean Code principles with clear naming and single responsibility
 */

export interface User {
  readonly id: string;
  readonly username: string;
  readonly name: string;
  readonly email?: string;
  readonly createdAt: Date;
  readonly lastLoginAt?: Date;
}

export interface UserCredentials {
  readonly username: string;
  readonly password?: string;
}

export interface UserProfile {
  readonly user: User;
  readonly isAuthenticated: boolean;
  readonly lastActivity: Date;
}

/**
 * User factory for creating user instances
 * Encapsulates user creation logic
 */
export class UserFactory {
  static createUser(
    id: string,
    username: string,
    name: string,
    email?: string
  ): User {
    return {
      id,
      username,
      name,
      email,
      createdAt: new Date(),
    };
  }

  static createAnonymousUser(username: string): User {
    return this.createUser(
      'anonymous',
      username,
      username,
      undefined
    );
  }
}

/**
 * User validation utilities
 * Single responsibility for user data validation
 */
export class UserValidator {
  static isValidUsername(username: string): boolean {
    return username.trim().length > 0 && username.length <= 50;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateUser(user: Partial<User>): string[] {
    const errors: string[] = [];
    
    if (!user.id || user.id.trim().length === 0) {
      errors.push('User ID is required');
    }
    
    if (!user.username || !this.isValidUsername(user.username)) {
      errors.push('Valid username is required');
    }
    
    if (!user.name || user.name.trim().length === 0) {
      errors.push('User name is required');
    }
    
    if (user.email && !this.isValidEmail(user.email)) {
      errors.push('Invalid email format');
    }
    
    return errors;
  }
}
