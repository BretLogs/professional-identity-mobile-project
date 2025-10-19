/**
 * Client Hook - Custom hook for client state and actions
 * Following Clean Code principles with clear separation of concerns
 */

import { ClientStatus } from '../models/Client';
import { useClientStore } from '../stores/clientStore';

/**
 * Custom hook for client functionality
 * Provides clean interface to client state and actions
 */
export const useClient = () => {
  const { state, actions } = useClientStore();

  return {
    // State
    clients: state.clients,
    selectedClient: state.selectedClient,
    isLoading: state.isLoading,
    error: state.error,
    filter: state.filter,
    filteredClients: state.filter === 'all' ? state.clients : state.clients.filter(client => client.status === state.filter),

    // Actions
    loadClients: actions.loadClients,
    createClient: actions.createClient,
    updateClient: actions.updateClient,
    deleteClient: actions.deleteClient,
    selectClient: actions.selectClient,
    setFilter: actions.setFilter,
    clearError: actions.clearError,
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
      client.clients.find(c => c.id === id),
    
    getClientsByStatus: (status: ClientStatus) => 
      client.clients.filter(c => c.status === status),
    
    getActiveClients: () => 
      client.clients.filter(c => c.status === ClientStatus.ACTIVE),
    
    getProspectClients: () => 
      client.clients.filter(c => c.status === ClientStatus.PROSPECT),
    
    getClientCount: () => client.clients.length,
    
    getFilteredClientCount: () => client.filteredClients.length,
    
    hasClients: () => client.clients.length > 0,
    
    isClientSelected: (clientId: string) => 
      client.selectedClient?.id === clientId,
  };
};
