/**
 * Client Controller - Handles client business logic
 * Following MVC pattern and Clean Code principles
 */

import { Client, ClientStatus, ClientValidator } from '../models/Client';
import { useClientStore } from '../stores/clientStore';

/**
 * Client Controller Class
 * Encapsulates client business logic and validation
 */
export class ClientController {
  private clientStore = useClientStore;

  /**
   * Loads all clients
   * @returns Promise<boolean> - Success status
   */
  async loadClients(): Promise<boolean> {
    try {
      await this.clientStore.getState().loadClients();
      return this.clientStore.getState().error === null;
    } catch (error) {
      console.error('ClientController.loadClients error:', error);
      return false;
    }
  }

  /**
   * Creates a new client with validation
   * @param clientData - Client data to create
   * @returns Promise<boolean> - Success status
   */
  async createClient(clientData: Omit<Client, 'id' | 'createdAt' | 'status'>): Promise<boolean> {
    try {
      // Validate client data
      const validationErrors = ClientValidator.validateClient(clientData);
      if (validationErrors.length > 0) {
        this.clientStore.getState().clearError();
        this.clientStore.setState({ 
          error: validationErrors.join(', ') 
        });
        return false;
      }

      // Clear any previous errors
      this.clientStore.getState().clearError();

      // Attempt to create client
      await this.clientStore.getState().createClient(clientData);
      
      // Check if creation was successful
      return this.clientStore.getState().error === null;
    } catch (error) {
      console.error('ClientController.createClient error:', error);
      return false;
    }
  }

  /**
   * Updates an existing client
   * @param id - Client ID
   * @param updates - Partial client data to update
   * @returns Promise<boolean> - Success status
   */
  async updateClient(id: string, updates: Partial<Client>): Promise<boolean> {
    try {
      // Validate updates if provided
      if (updates.name || updates.email || updates.phone) {
        const validationErrors = ClientValidator.validateClient(updates);
        if (validationErrors.length > 0) {
          this.clientStore.getState().clearError();
          this.clientStore.setState({ 
            error: validationErrors.join(', ') 
          });
          return false;
        }
      }

      // Clear any previous errors
      this.clientStore.getState().clearError();

      // Attempt to update client
      await this.clientStore.getState().updateClient(id, updates);
      
      // Check if update was successful
      return this.clientStore.getState().error === null;
    } catch (error) {
      console.error('ClientController.updateClient error:', error);
      return false;
    }
  }

  /**
   * Deletes a client
   * @param id - Client ID
   * @returns Promise<boolean> - Success status
   */
  async deleteClient(id: string): Promise<boolean> {
    try {
      // Clear any previous errors
      this.clientStore.getState().clearError();

      // Attempt to delete client
      await this.clientStore.getState().deleteClient(id);
      
      // Check if deletion was successful
      return this.clientStore.getState().error === null;
    } catch (error) {
      console.error('ClientController.deleteClient error:', error);
      return false;
    }
  }

  /**
   * Selects a client
   * @param client - Client to select or null to deselect
   */
  selectClient(client: Client | null): void {
    this.clientStore.getState().selectClient(client);
  }

  /**
   * Sets the client filter
   * @param filter - Filter status
   */
  setFilter(filter: ClientStatus | 'all'): void {
    this.clientStore.getState().setFilter(filter);
  }

  /**
   * Gets all clients
   * @returns Client[] - Array of clients
   */
  getClients(): Client[] {
    return this.clientStore.getState().clients;
  }

  /**
   * Gets filtered clients
   * @returns Client[] - Array of filtered clients
   */
  getFilteredClients(): Client[] {
    const state = this.clientStore.getState();
    if (state.filter === 'all') {
      return state.clients;
    }
    return state.clients.filter(client => client.status === state.filter);
  }

  /**
   * Gets the selected client
   * @returns Client | null - Selected client or null
   */
  getSelectedClient(): Client | null {
    return this.clientStore.getState().selectedClient;
  }

  /**
   * Gets the current loading state
   * @returns boolean - Loading status
   */
  isLoading(): boolean {
    return this.clientStore.getState().isLoading;
  }

  /**
   * Gets the current error
   * @returns string | null - Error message or null
   */
  getError(): string | null {
    return this.clientStore.getState().error;
  }

  /**
   * Clears the current error
   */
  clearError(): void {
    this.clientStore.getState().clearError();
  }
}

/**
 * Client Controller Factory
 * Provides centralized controller creation
 */
export class ClientControllerFactory {
  static create(): ClientController {
    return new ClientController();
  }
}

/**
 * Global client controller instance
 * Singleton pattern for consistent state access
 */
export const clientController = ClientControllerFactory.create();
