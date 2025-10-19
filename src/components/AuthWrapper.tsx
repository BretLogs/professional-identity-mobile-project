import { Stack } from '@tamagui/core';
import { Redirect } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Stack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
        <ActivityIndicator size="large" />
      </Stack>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}
