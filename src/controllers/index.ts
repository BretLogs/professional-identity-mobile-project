/**
 * Controllers - Business logic and state management
 * Central export point for all controller classes
 * Following Clean Code principles with clear organization
 */

// Authentication controller
export * from './AuthController';

// Client controller
export * from './ClientController';

// Re-export commonly used controllers for convenience
export { authController } from './AuthController';
export { clientController } from './ClientController';

