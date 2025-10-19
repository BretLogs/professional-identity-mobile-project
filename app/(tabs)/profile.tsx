import { Button } from '@tamagui/button';
import { Stack, Text } from '@tamagui/core';
import { useAuth } from '../../src/hooks/useAuth';

/**
 * Profile Screen Component
 * Displays user profile information and logout functionality
 * Following Clean Code principles with clear separation of concerns
 */

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <Stack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background" padding="$4">
      <Stack space="$4" alignItems="center">
        <Text fontSize="$6" fontWeight="200" color="$color">
          My Profile Page
        </Text>
        
        {user && (
          <Stack space="$2" alignItems="center">
            <Text fontSize="$4" color="$color" textAlign="center">
              Welcome, {user.name}
            </Text>
            <Text fontSize="$3" color="$color" opacity={0.7} textAlign="center">
              @{user.username}
            </Text>
          </Stack>
        )}
        
        <Button
          size="$4"
          backgroundColor="$red8"
          color="white"
          onPress={signOut}
          hoverStyle={{ backgroundColor: '$red9' }}
          pressStyle={{ backgroundColor: '$red10' }}
        >
          Sign Out
        </Button>
      </Stack>
    </Stack>
  );
}
