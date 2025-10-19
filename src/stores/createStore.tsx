/**
 * Custom Store Creator - Simple React Context state management
 * Compatible with React 19 and Expo
 * Following Clean Code principles with clear separation of concerns
 */

import React, { createContext, ReactNode, useContext, useReducer } from 'react';

/**
 * Store creator function that creates a simple React Context store
 * @param initialState - Initial state object
 * @param actions - Actions object
 * @returns Store hook and provider
 */
export function createStore<TState, TActions>(
  initialState: TState,
  actions: TActions
) {
  // Create context
  const StoreContext = createContext<{
    state: TState;
    actions: TActions;
    setState: (partial: Partial<TState>) => void;
  } | null>(null);

  // Store provider component
  const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(
      (currentState: TState, action: { type: string; payload?: any }) => {
        switch (action.type) {
          case 'SET_STATE':
            return { ...currentState, ...action.payload };
          case 'RESET_STATE':
            return initialState;
          default:
            return currentState;
        }
      },
      initialState
    );

    const setState = (partial: Partial<TState>) => {
      dispatch({ type: 'SET_STATE', payload: partial });
    };

    return (
      <StoreContext.Provider value={{ state, actions, setState }}>
        {children}
      </StoreContext.Provider>
    );
  };

  // Store hook
  const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
      throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
  };

  return { StoreProvider, useStore };
}

/**
 * Devtools middleware (simplified version)
 * @param store - The store configuration
 * @param name - Store name for devtools
 * @returns Store configuration with devtools
 */
export function devtools<T>(store: T, name?: string): T {
  // In a real implementation, this would integrate with Redux DevTools
  // For now, we'll just return the store as-is
  if (__DEV__ && name) {
    console.log(`[${name}] Store created:`, store);
  }
  return store;
}
