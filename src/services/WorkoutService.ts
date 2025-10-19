/**
 * Workout Service - Handles workout data operations
 * Following Clean Code principles with clear separation of concerns
 */

import workoutData from '../data/workouts.json';
import { WorkoutData, WorkoutSession } from '../models/Workout';

export class WorkoutService {
  private static instance: WorkoutService;
  private workouts: WorkoutData;

  private constructor() {
    this.workouts = workoutData as WorkoutData;
  }

  public static getInstance(): WorkoutService {
    if (!WorkoutService.instance) {
      WorkoutService.instance = new WorkoutService();
    }
    return WorkoutService.instance;
  }

  /**
   * Get all workout sessions for a specific client
   */
  public getClientWorkouts(clientId: string): WorkoutSession[] {
    const clientWorkouts = this.workouts.workouts.find(
      (workout) => workout.clientId === clientId
    );
    return clientWorkouts?.sessions || [];
  }

  /**
   * Get a specific workout session by ID
   */
  public getWorkoutSession(clientId: string, sessionId: string): WorkoutSession | null {
    const clientWorkouts = this.getClientWorkouts(clientId);
    return clientWorkouts.find((session) => session.id === sessionId) || null;
  }

  /**
   * Get workout sessions for a specific date range
   */
  public getWorkoutsByDateRange(
    clientId: string,
    startDate: string,
    endDate: string
  ): WorkoutSession[] {
    const clientWorkouts = this.getClientWorkouts(clientId);
    return clientWorkouts.filter(
      (session) => session.date >= startDate && session.date <= endDate
    );
  }

  /**
   * Get workout sessions for a specific day of the week
   */
  public getWorkoutsByDay(clientId: string, day: string): WorkoutSession[] {
    const clientWorkouts = this.getClientWorkouts(clientId);
    return clientWorkouts.filter((session) => session.day === day);
  }

  /**
   * Get the most recent workout session for a client
   */
  public getLatestWorkout(clientId: string): WorkoutSession | null {
    const clientWorkouts = this.getClientWorkouts(clientId);
    if (clientWorkouts.length === 0) return null;
    
    return clientWorkouts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  }

  /**
   * Get total number of workout sessions for a client
   */
  public getTotalWorkoutSessions(clientId: string): number {
    return this.getClientWorkouts(clientId).length;
  }

  /**
   * Check if client has any workout sessions
   */
  public hasWorkoutSessions(clientId: string): boolean {
    return this.getClientWorkouts(clientId).length > 0;
  }
}
