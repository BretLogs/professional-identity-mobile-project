import { Button } from '@tamagui/button';
import { Stack, Text } from '@tamagui/core';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { useAuth } from '../src/contexts/AuthContext';

export default function LoginScreen() {
  const { signInWithUsername, loading, user } = useAuth();
  const [username, setUsername] = useState('');

  // Redirect to dashboard if user is already authenticated
  if (user) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  const handleLogin = async () => {
    // Always proceed to dashboard - frontend-only authentication
    console.log('Login button pressed, username:', username);
    await signInWithUsername(username.trim());
    console.log('Authentication completed');
  };

  return (
    <Stack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background" padding="$4">
      <Stack space="$4" alignItems="center" maxWidth={300} width="100%">
        <Text fontSize="$8" fontWeight="bold" color="$color" textAlign="center">
          Professional Identity
        </Text>
        <Text fontSize="$4" color="$color" textAlign="center" opacity={0.7}>
          Sign in to continue
        </Text>
        
        <Stack space="$3" width="100%">
          <Text fontSize="$3" fontWeight="600" color="$color">
            Who are you?
          </Text>
          <TextInput
            placeholder="Your given username..."
            value={username}
            onChangeText={setUsername}
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              backgroundColor: '#ffffff',
              color: '#000000',
            }}
            editable={!loading}
          />
        </Stack>
        
        <Button
          size="$4"
          backgroundColor="$blue10"
          color="white"
          fontWeight="600"
          onPress={handleLogin}
          disabled={loading}
          opacity={loading ? 0.7 : 1}
          icon={loading ? <ActivityIndicator size="small" color="white" /> : undefined}
          width="100%"
        >
          {loading ? 'Signing in...' : 'Jump in!'}
        </Button>
      </Stack>
    </Stack>
  );
}
