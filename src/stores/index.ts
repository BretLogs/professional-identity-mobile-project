/**
 * Stores - State management with Zustand
 * Central export point for all store hooks and selectors
 * Following Clean Code principles with clear organization
 */

// Authentication store
export { authSelectors, useAuthStore } from './authStore';

// Client store
export { clientSelectors, useClientStore } from './clientStore';

// Re-export commonly used types for convenience
export type { AuthStore } from '../models/Auth';
export type { Client, ClientStatus } from '../models/Client';

