/**
 * Client Store - Custom store for client state management
 * Following Clean Code principles with clear separation of concerns
 */

import { Client, ClientStatus } from '../models/Client';
import { createStore } from './createStore';

/**
 * Client store state interface
 * Defines the shape of the client store state
 */
interface ClientStoreState {
  // State
  clients: Client[];
  selectedClient: Client | null;
  isLoading: boolean;
  error: string | null;
  filter: ClientStatus | 'all';

  // Actions
  loadClients: () => Promise<void>;
  selectClient: (client: Client | null) => void;
  createClient: (clientData: Omit<Client, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateClient: (id: string, updates: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  setFilter: (filter: ClientStatus | 'all') => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

/**
 * Client store implementation using custom store
 * Centralized state management for client operations
 */

// Initial state
const initialClientState = {
  clients: [],
  selectedClient: null,
  isLoading: false,
  error: null,
  filter: 'all',
};

// Actions
const clientActions = {
  loadClients: async () => {
    console.log('Load clients');
  },
  selectClient: (client: Client | null) => {
    console.log('Select client:', client);
  },
  createClient: async (clientData: Omit<Client, 'id' | 'createdAt' | 'status'>) => {
    console.log('Create client:', clientData);
  },
  updateClient: async (id: string, updates: Partial<Client>) => {
    console.log('Update client:', id, updates);
  },
  deleteClient: async (id: string) => {
    console.log('Delete client:', id);
  },
  setFilter: (filter: ClientStatus | 'all') => {
    console.log('Set filter:', filter);
  },
  clearError: () => {
    console.log('Clear error');
  },
  setLoading: (loading: boolean) => {
    console.log('Set loading:', loading);
  },
};

const { StoreProvider: ClientStoreProvider, useStore: useClientStore } = createStore(
  initialClientState,
  clientActions
);

export { ClientStoreProvider, useClientStore };

/**
 * Client store selectors
 * Provides convenient access to specific state slices and computed values
 */
export const clientSelectors = {
  getClients: (state: ClientStoreState) => state.clients,
  getSelectedClient: (state: ClientStoreState) => state.selectedClient,
  getIsLoading: (state: ClientStoreState) => state.isLoading,
  getError: (state: ClientStoreState) => state.error,
  getFilter: (state: ClientStoreState) => state.filter,
  
  getFilteredClients: (state: ClientStoreState) => {
    if (state.filter === 'all') {
      return state.clients;
    }
    return state.clients.filter(client => client.status === state.filter);
  },
  
  getClientActions: (state: ClientStoreState) => ({
    loadClients: state.loadClients,
    selectClient: state.selectClient,
    createClient: state.createClient,
    updateClient: state.updateClient,
    deleteClient: state.deleteClient,
    setFilter: state.setFilter,
    clearError: state.clearError,
    setLoading: state.setLoading,
  }),
};
