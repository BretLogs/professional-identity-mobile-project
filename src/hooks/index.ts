/**
 * Hooks - Custom React hooks for state management
 * Central export point for all custom hooks
 * Following Clean Code principles with clear organization
 */

// Authentication hooks
export * from './useAuth';

// Client hooks
export * from './useClient';

// Re-export commonly used hooks for convenience
export { useAuth, useAuthExtended } from './useAuth';
export { useClient, useClientExtended } from './useClient';

