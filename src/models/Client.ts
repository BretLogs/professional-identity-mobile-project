/**
 * Client Model - Represents client data structure and business logic
 * Following Clean Code principles with clear naming and single responsibility
 */

export interface Client {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly company?: string;
  readonly createdAt: Date;
  readonly lastContactAt?: Date;
  readonly status: ClientStatus;
}

export enum ClientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PROSPECT = 'prospect',
  COMPLETED = 'completed',
}

export interface ClientProfile {
  readonly client: Client;
  readonly totalSessions: number;
  readonly lastSessionDate?: Date;
  readonly notes?: string;
}

/**
 * Client factory for creating client instances
 * Encapsulates client creation logic
 */
export class ClientFactory {
  static createClient(
    id: string,
    name: string,
    email: string,
    phone?: string,
    company?: string
  ): Client {
    return {
      id,
      name,
      email,
      phone,
      company,
      createdAt: new Date(),
      status: ClientStatus.PROSPECT,
    };
  }
}

/**
 * Client validation utilities
 * Single responsibility for client data validation
 */
export class ClientValidator {
  static isValidName(name: string): boolean {
    return name.trim().length > 0 && name.length <= 100;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  static validateClient(client: Partial<Client>): string[] {
    const errors: string[] = [];
    
    if (!client.id || client.id.trim().length === 0) {
      errors.push('Client ID is required');
    }
    
    if (!client.name || !this.isValidName(client.name)) {
      errors.push('Valid client name is required');
    }
    
    if (!client.email || !this.isValidEmail(client.email)) {
      errors.push('Valid email is required');
    }
    
    if (client.phone && !this.isValidPhone(client.phone)) {
      errors.push('Invalid phone number format');
    }
    
    return errors;
  }
}
