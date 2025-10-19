/**
 * Models - Data structures and business logic
 * Central export point for all model types and interfaces
 * Following Clean Code principles with clear organization
 */

// User related models
export * from './Auth';
export * from './User';

// Client related models
export * from './Client';

// Workout related models
export * from './Workout';

// Re-export commonly used types for convenience
export type { AuthActions, AuthState, AuthStore } from './Auth';
export type { Client, ClientProfile, ClientStatus } from './Client';
export type { User } from './User';
export type { ClientWorkouts, WorkoutData, WorkoutSession } from './Workout';

