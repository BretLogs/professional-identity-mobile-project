import { Button } from '@tamagui/button';
import { Card } from '@tamagui/card';
import { Stack, Text, View } from '@tamagui/core';
import { LogOut, User } from '@tamagui/lucide-icons';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useAuth } from '../../src/hooks/useAuth';

/**
 * Profile Screen Component
 * Displays user profile information and logout functionality
 * Following Clean Code principles with clear separation of concerns
 */

interface UserProfileData {
  id?: string;
  username?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileImage?: string | null;
  createdAt?: string;
  lastLoginAt?: string;
  preferences?: {
    theme?: string;
    notifications?: boolean;
    language?: string;
  };
  profile?: {
    bio?: string;
    specialization?: string;
    certifications?: string[];
    experience?: string;
  };
}

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [userProfileData, setUserProfileData] = useState<UserProfileData | null>(null);

  // Load user profile data from JSON file
  useEffect(() => {
    const loadUserProfileData = async () => {
      try {
        const userData = require('../../src/data/user.json');
        setUserProfileData(userData.user);
      } catch (error) {
        console.error('Error loading user profile data:', error);
      }
    };

    loadUserProfileData();
  }, []);

  // Extract first name from user's full name
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Not available';
    }
  };

  return (
    <Stack flex={1} backgroundColor="$background">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Stack space="$0" maxWidth={600} width="100%">
          {/* Hero Section - Profile Header */}
          <Stack 
            backgroundColor="$purple8" 
            padding="$6" 
            paddingTop="$8"
            borderBottomLeftRadius="$6"
            borderBottomRightRadius="$6"
            space="$4"
            alignItems="center"
          >
            {/* Profile Picture */}
            <View
              width={100}
              height={100}
              borderRadius={50}
              backgroundColor="white"
              alignItems="center"
              justifyContent="center"
              borderWidth={4}
              borderColor="white"
              shadowColor="$purple12"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={8}
            >
              <User size={50} color="$purple8" />
            </View>
            
            {/* Name and Title */}
            <Stack space="$2" alignItems="center">
              <Text 
                fontSize="$6" 
                fontWeight="700" 
                color="white" 
                textAlign="center"
              >
                {user?.name || 'User Name'}
        </Text>
        
              {userProfileData?.profile?.specialization && (
                <Text 
                  fontSize="$4" 
                  fontWeight="400" 
                  color="white" 
                  opacity={0.9}
                  textAlign="center"
                >
                  {userProfileData.profile.specialization}
                </Text>
              )}
            </Stack>
          </Stack>

          {/* Content Section */}
          <Stack padding="$4" space="$4" width="100%">
            {/* Bio Section */}
            {userProfileData?.profile?.bio && (
              <Card backgroundColor="white" padding="$4" borderRadius="$8" borderWidth={1} borderColor="$borderColor" shadowColor="$gray8" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={0.1} shadowRadius={4} elevation={2}>
                <Stack space="$3">
                  <Text fontSize="$4" fontWeight="600" color="$color">
                    About
                  </Text>
                  <Text fontSize="$3" color="$color" lineHeight="$5">
                    {userProfileData.profile.bio}
                  </Text>
                </Stack>
              </Card>
            )}
            {/* Sign Out Button */}
            <Stack space="$3" alignItems="center" marginTop="$4">
              {/* Logout Text Button */}
              <Button
                size="$6"
                backgroundColor="$red5"
                color="white"
                borderRadius="$6"
                paddingHorizontal="$10"
                height="$6"
                width="100%"
                onPress={signOut}
                hoverStyle={{
                  backgroundColor: '$red10',
                  scale: 1.02
                }}
                pressStyle={{
                  backgroundColor: '$red10',
                  scale: 0.98
                }}
                animation="bouncy"
              >
                <LogOut size={22} color="white" style={{ transform: [{ rotate: '180deg' }] }} />
                I'll be back
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </ScrollView>
    </Stack>
  );
}
