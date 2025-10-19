/**
 * Root Layout Component
 * Main application layout with Tamagui provider
 * Following Clean Code principles with clear separation of concerns
 */

import { TamaguiProvider } from '@tamagui/core';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthStoreProvider } from '../src/stores/authStore';
import { ClientStoreProvider } from '../src/stores/clientStore';
import config from '../tamagui.config';

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <AuthStoreProvider>
        <ClientStoreProvider>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="client-detail" 
              options={{ 
                headerShown: false,
                title: '',
                headerTintColor: '#8c52ff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTransparent: true,
              }} 
            />
          </Stack>
          <StatusBar style="light" />
        </ClientStoreProvider>
      </AuthStoreProvider>
    </TamaguiProvider>
  );
}
