/**
 * Authentication Wrapper Component
 * Handles authentication state and routing
 * Following Clean Code principles with clear separation of concerns
 */

import { Stack } from '@tamagui/core';
import { Redirect } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';

interface AuthWrapperProps {
  children: React.ReactNode;
}

/**
 * Authentication wrapper component
 * Protects routes that require authentication
 */
export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Show loading state while authentication is in progress
  if (isLoading) {
    return (
      <Stack 
        flex={1} 
        justifyContent="center" 
        alignItems="center" 
        backgroundColor="$background"
      >
        <ActivityIndicator size="large" />
      </Stack>
    );
  }

  // Redirect to login if user is not authenticated
  if (!isAuthenticated || !user) {
    return <Redirect href="/login" />;
  }

  // Render protected content
  return <>{children}</>;
}
