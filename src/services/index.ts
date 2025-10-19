/**
 * Services - Business logic and external API calls
 * Central export point for all service classes and interfaces
 * Following Clean Code principles with clear organization
 */

// Authentication services
export * from './AuthService';

// Client services
export * from './ClientService';

// Re-export commonly used types for convenience
export type { AuthResult, IAuthService } from '../models/Auth';
export type { ClientResult, IClientService } from './ClientService';

