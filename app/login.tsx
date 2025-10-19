import { Button } from '@tamagui/button';
import { Stack, Text } from '@tamagui/core';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import landingPageImg from '../assets/images/landing_page_img.png';
import { useAuth } from '../src/hooks/useAuth';

/**
 * Login Screen Component
 * Handles user authentication
 * Following Clean Code principles with clear separation of concerns
 */

export default function LoginScreen() {
  const { signIn, isLoading, isAuthenticated, error, clearError } = useAuth();
  const [username, setUsername] = useState('');

  // Redirect to dashboard if user is already authenticated
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  /**
   * Handles login form submission
   * Validates input and attempts authentication
   */
  const handleLogin = async () => {
    // Clear any previous errors
    clearError();
    
    // Validate username
    if (!username.trim()) {
      return;
    }

    // Attempt authentication
    const success = await signIn(username.trim());
    
    if (success) {
      console.log('Authentication successful');
    } else {
      console.log('Authentication failed');
    }
  };

  return (
    <Stack flex={1} backgroundColor="$background">
      {/* Fixed top section with subheader */}
      <Stack space="$4" alignItems="center" paddingTop="$8" paddingHorizontal="$6">
        <Text fontSize="$6" fontWeight="bold" color="$color" textAlign="center">
          My Workout Portfolio
        </Text>
      </Stack>
      
      {/* Fixed image section */}
      <Stack flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Image
          source={landingPageImg}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'contain',
            borderRadius: 12,
          }}
        />
      </Stack>
      
      {/* Absolutely positioned bottom section that adjusts with keyboard */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '$background',
          paddingHorizontal: 24,
          paddingBottom: 24,
          paddingTop: 16,
        }}
      >
        <Stack space="$4" alignItems="center">
          <Stack space="$3" width="100%">
            <Text fontSize="$3" fontWeight="600" color="$color" textAlign="center">
              Who are you?
            </Text>
            <TextInput
              placeholder="Your given username..."
              value={username}
              onChangeText={setUsername}
              style={{
                borderWidth: 1,
                borderColor: '#d9c2ff',
                borderRadius: 24,
                padding: 16,
                fontSize: 16,
                backgroundColor: '#f0e8ff',
                color: '#2e2e2e',
                width: '100%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
              placeholderTextColor="#757575"
              editable={!isLoading}
            />
          </Stack>
          
          <Button
            size="$6"
            backgroundColor="$purple8"
            color="white"
            fontWeight="600"
            borderRadius="$8"
            onPress={handleLogin}
            disabled={isLoading}
            opacity={isLoading ? 0.7 : 1}
            icon={isLoading ? <ActivityIndicator size="small" color="white" /> : undefined}
            width="100%"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={4}
            hoverStyle={{
              backgroundColor: '$purple9',
            }}
            pressStyle={{
              backgroundColor: '$purple10',
            }}
          >
            {isLoading ? 'Signing in...' : 'Jump in!'}
          </Button>
        </Stack>
      </KeyboardAvoidingView>
    </Stack>
  );
}
