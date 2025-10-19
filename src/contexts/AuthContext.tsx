import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithUsername: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signInWithUsername = async (username: string) => {
    try {
      setLoading(true);
      // Frontend-only authentication - always succeeds
      const mockUser: User = {
        id: '1',
        username: username || 'Anonymous',
        name: username || 'Anonymous User'
      };
      
      // Simulate brief network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(mockUser);
      console.log('User set in context:', mockUser);
    } catch (error) {
      console.error('Error signing in with username:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    signInWithUsername,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
