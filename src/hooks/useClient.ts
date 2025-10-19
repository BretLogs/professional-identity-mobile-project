/**
 * Client Hook - Custom hook for client state and actions
 * Following Clean Code principles with clear separation of concerns
 */

import { Client, ClientStatus } from '../models/Client';
import { useClientStore } from '../stores/clientStore';

/**
 * Custom hook for client functionality
 * Provides clean interface to client state and actions
 */
export const useClient = () => {
  const { state, setState } = useClientStore();

  return {
    // State
    clients: state.clients,
    selectedClient: state.selectedClient,
    isLoading: state.isLoading,
    error: state.error,
    filter: state.filter,
    filteredClients: state.filter === 'all' ? state.clients : state.clients.filter((client: any) => client.status === state.filter),

    // Actions
    loadClients: async () => {
      try {
        const clientsData = require('../data/clients.json');
        const clientsWithDates = clientsData.clients.map((client: any) => ({
          ...client,
          createdAt: new Date(client.createdAt),
          lastContactAt: client.lastCheckedDate ? new Date(client.lastCheckedDate) : undefined,
        }));
        setState({ clients: clientsWithDates as any, isLoading: false });
      } catch (error) {
        console.error('Error loading clients:', error);
        setState({ error: 'Failed to load clients' as any, isLoading: false });
      }
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
    selectClient: (client: Client | null) => {
      setState({ selectedClient: client as any });
    },
    setFilter: (filter: ClientStatus | 'all') => {
      setState({ filter });
    },
    clearError: () => {
      setState({ error: null as any });
    },
  };
};

/**
 * Client hook with additional utilities
 * Provides extended functionality for complex client scenarios
 */
export const useClientExtended = () => {
  const client = useClient();

  return {
    ...client,
    
    // Additional utilities
    getClientById: (id: string) => 
      client.clients.find((c: any) => c.id === id),
    
    getClientsByStatus: (status: ClientStatus) => 
      client.clients.filter((c: any) => c.status === status),
    
    getActiveClients: () => 
      client.clients.filter((c: any) => c.status === ClientStatus.ACTIVE),
    
    getProspectClients: () => 
      client.clients.filter((c: any) => c.status === ClientStatus.PROSPECT),
    
    getClientCount: () => client.clients.length,
    
    getFilteredClientCount: () => client.filteredClients.length,
    
    hasClients: () => client.clients.length > 0,
    
    isClientSelected: (clientId: string) => 
      (client.selectedClient as any)?.id === clientId,
  };
};
