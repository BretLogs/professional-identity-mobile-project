/**
 * Client Service - Handles client business logic
 * Following Clean Code principles with single responsibility
 */

import { Client, ClientFactory, ClientValidator } from '../models/Client';

export interface ClientResult {
  success: boolean;
  client?: Client;
  error?: string;
}

export interface IClientService {
  getClients(): Promise<Client[]>;
  getClientById(id: string): Promise<ClientResult>;
  createClient(clientData: Omit<Client, 'id' | 'createdAt' | 'status'>): Promise<ClientResult>;
  updateClient(id: string, updates: Partial<Client>): Promise<ClientResult>;
  deleteClient(id: string): Promise<ClientResult>;
}

/**
 * Mock Client Service Implementation
 * Simulates client management with proper error handling
 */
export class MockClientService implements IClientService {
  private clients: Client[] = [];

  /**
   * Retrieves all clients
   * @returns Promise<Client[]> - Array of clients
   */
  async getClients(): Promise<Client[]> {
    await this.simulateNetworkDelay();
    return [...this.clients];
  }

  /**
   * Retrieves a client by ID
   * @param id - Client ID
   * @returns Promise<ClientResult> - Client result
   */
  async getClientById(id: string): Promise<ClientResult> {
    try {
      await this.simulateNetworkDelay();
      
      const client = this.clients.find(c => c.id === id);
      
      if (!client) {
        return {
          success: false,
          error: 'Client not found'
        };
      }

      return {
        success: true,
        client
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve client'
      };
    }
  }

  /**
   * Creates a new client
   * @param clientData - Client data without ID and timestamps
   * @returns Promise<ClientResult> - Creation result
   */
  async createClient(clientData: Omit<Client, 'id' | 'createdAt' | 'status'>): Promise<ClientResult> {
    try {
      // Validate client data
      const validationErrors = ClientValidator.validateClient(clientData);
      if (validationErrors.length > 0) {
        return {
          success: false,
          error: validationErrors.join(', ')
        };
      }

      await this.simulateNetworkDelay();

      const client = ClientFactory.createClient(
        this.generateId(),
        clientData.name,
        clientData.email,
        clientData.phone,
        clientData.company
      );

      this.clients.push(client);

      return {
        success: true,
        client
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create client'
      };
    }
  }

  /**
   * Updates an existing client
   * @param id - Client ID
   * @param updates - Partial client data to update
   * @returns Promise<ClientResult> - Update result
   */
  async updateClient(id: string, updates: Partial<Client>): Promise<ClientResult> {
    try {
      await this.simulateNetworkDelay();

      const clientIndex = this.clients.findIndex(c => c.id === id);
      
      if (clientIndex === -1) {
        return {
          success: false,
          error: 'Client not found'
        };
      }

      // Validate updates if provided
      if (updates.name || updates.email || updates.phone) {
        const validationErrors = ClientValidator.validateClient(updates);
        if (validationErrors.length > 0) {
          return {
            success: false,
            error: validationErrors.join(', ')
          };
        }
      }

      this.clients[clientIndex] = {
        ...this.clients[clientIndex],
        ...updates
      };

      return {
        success: true,
        client: this.clients[clientIndex]
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update client'
      };
    }
  }

  /**
   * Deletes a client
   * @param id - Client ID
   * @returns Promise<ClientResult> - Deletion result
   */
  async deleteClient(id: string): Promise<ClientResult> {
    try {
      await this.simulateNetworkDelay();

      const clientIndex = this.clients.findIndex(c => c.id === id);
      
      if (clientIndex === -1) {
        return {
          success: false,
          error: 'Client not found'
        };
      }

      const client = this.clients[clientIndex];
      this.clients.splice(clientIndex, 1);

      return {
        success: true,
        client
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete client'
      };
    }
  }

  /**
   * Simulates network delay for realistic UX
   * @private
   */
  private async simulateNetworkDelay(): Promise<void> {
    return new Promise(resolve => 
      setTimeout(resolve, 300)
    );
  }

  /**
   * Generates a unique ID for new clients
   * @private
   */
  private generateId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Client Service Factory
 * Provides centralized service creation
 */
export class ClientServiceFactory {
  static createMockService(): IClientService {
    return new MockClientService();
  }
}
