/**
 * Workout Model - Represents workout session data structure and business logic
 * Following Clean Code principles with clear naming and single responsibility
 */

export interface WorkoutSession {
  readonly id: string;
  readonly day: string;
  readonly date: string;
  readonly workouts: string; // Text format as requested, not array
}

export interface ClientWorkouts {
  readonly clientId: string;
  readonly sessions: WorkoutSession[];
}

export interface WorkoutData {
  readonly workouts: ClientWorkouts[];
}

/**
 * Workout factory for creating workout instances
 * Encapsulates workout creation logic
 */
export class WorkoutFactory {
  static createWorkoutSession(
    id: string,
    day: string,
    date: string,
    workouts: string
  ): WorkoutSession {
    return {
      id,
      day,
      date,
      workouts,
    };
  }

  static createClientWorkouts(
    clientId: string,
    sessions: WorkoutSession[]
  ): ClientWorkouts {
    return {
      clientId,
      sessions,
    };
  }
}

/**
 * Workout validation utilities
 * Single responsibility for workout data validation
 */
export class WorkoutValidator {
  static isValidDay(day: string): boolean {
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return validDays.includes(day);
  }

  static isValidDate(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  }

  static isValidWorkoutText(workouts: string): boolean {
    return workouts.trim().length > 0 && workouts.length <= 1000;
  }

  static validateWorkoutSession(session: Partial<WorkoutSession>): string[] {
    const errors: string[] = [];
    
    if (!session.id || session.id.trim().length === 0) {
      errors.push('Workout session ID is required');
    }
    
    if (!session.day || !this.isValidDay(session.day)) {
      errors.push('Valid day is required');
    }
    
    if (!session.date || !this.isValidDate(session.date)) {
      errors.push('Valid date format (YYYY-MM-DD) is required');
    }
    
    if (!session.workouts || !this.isValidWorkoutText(session.workouts)) {
      errors.push('Valid workout text is required');
    }
    
    return errors;
  }
}
