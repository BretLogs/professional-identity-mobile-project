/**
 * Client Detail Screen Component
 * Displays detailed client information in a header layout
 * Following Clean Code principles with clear separation of concerns
 */

import { Button } from '@tamagui/button';
import { Card } from '@tamagui/card';
import { Stack, Text } from '@tamagui/core';
import { User, UserCheck } from '@tamagui/lucide-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useClient } from '../src/hooks/useClient';
import { Client } from '../src/models/Client';

export default function ClientDetailScreen() {
  const router = useRouter();
  const { clientId } = useLocalSearchParams<{ clientId: string }>();
  const { clients, selectClient } = useClient();
  const [client, setClient] = useState<Client | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (clientId && clients.length > 0) {
      const foundClient = clients.find((c: Client) => c.id === clientId);
      if (foundClient) {
        setClient(foundClient);
        selectClient(foundClient);
      }
    }
  }, [clientId, clients, selectClient]);

  if (!client) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Stack flex={1} backgroundColor="$background" padding="$4" justifyContent="center" alignItems="center">
          <Text fontSize="$6" color="$color" textAlign="center">
            Client not found
          </Text>
          <Button
            marginTop="$4"
            onPress={() => router.back()}
            backgroundColor="$blue6"
            color="white"
          >
            Go Back
          </Button>
        </Stack>
      </SafeAreaView>
    );
  }

  const getGenderIcon = (gender: 'male' | 'female') => {
    return gender === 'male' ? User : UserCheck;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Stack flex={1} backgroundColor="$background">
        {/* Header Section */}
        <Stack 
          backgroundColor="$blue6" 
          padding="$6" 
          paddingTop={insets.top + 32}
          borderBottomLeftRadius="$6"
          borderBottomRightRadius="$6"
        >
        <Stack space="$4" alignItems="center">
          {/* Gender Icon */}
          <Stack 
            width={80} 
            height={80} 
            backgroundColor="white" 
            borderRadius="$12" 
            justifyContent="center" 
            alignItems="center"
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.1}
            shadowRadius={8}
          >
            {(() => {
              const GenderIcon = getGenderIcon(client.gender);
              return <GenderIcon size={40} color="#8c52ff" />;
            })()}
          </Stack>

          {/* Client Name */}
          <Text 
            fontSize="$8" 
            fontWeight="bold" 
            color="white" 
            textAlign="center"
          >
            {client.name}
          </Text>

          {/* Basic Info */}
          <Stack space="$4" justifyContent="center" flexDirection="row">
            <Stack alignItems="center" space="$2" marginRight="$4">
              <Text fontSize="$3" color="$blue1" textAlign="center">
                Weight
              </Text>
              <Text fontSize="$5" fontWeight="600" color="white" textAlign="center">
                {client.weight}
              </Text>
            </Stack>
            
            <Stack alignItems="center" space="$2">
              <Text fontSize="$3" color="$blue1" textAlign="center">
                Height
              </Text>
              <Text fontSize="$5" fontWeight="600" color="white" textAlign="center">
                {client.height}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Content Section */}
      <ScrollView style={{ flex: 1 }}>
        <Stack padding="$4" space="$4">
          {/* Description Card */}
          <Card padding="$4" backgroundColor="$gray1" borderColor="$gray3">
            <Stack space="$3">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                About {client.name}
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$6">
                {client.description}
              </Text>
            </Stack>
          </Card>

          {/* Contact Information */}
          <Card padding="$4" backgroundColor="$green1" borderColor="$green3">
            <Stack space="$3">
              <Text fontSize="$5" fontWeight="600" color="$green12">
                Contact Information
              </Text>
              <Stack space="$2">
                <Stack space="$3" alignItems="center" flexDirection="row">
                  <Text fontSize="$4" color="$green11" fontWeight="500">
                    Email:
                  </Text>
                  <Text fontSize="$4" color="$green12">
                    {client.email}
                  </Text>
                </Stack>
                {client.phone && (
                  <Stack space="$3" alignItems="center" flexDirection="row">
                    <Text fontSize="$4" color="$green11" fontWeight="500">
                      Phone:
                    </Text>
                    <Text fontSize="$4" color="$green12">
                      {client.phone}
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Card>

          {/* Workout Status */}
          <Card padding="$4" backgroundColor="$orange1" borderColor="$orange3">
            <Stack space="$3">
              <Text fontSize="$5" fontWeight="600" color="$orange12">
                Workout Status
              </Text>
              <Stack space="$2">
                <Stack space="$3" alignItems="center" flexDirection="row">
                  <Text fontSize="$4" color="$orange11" fontWeight="500">
                    Last Checked:
                  </Text>
                  <Text fontSize="$4" color="$orange12" fontWeight="600">
                    {client.lastChecked}
                  </Text>
                </Stack>
                <Stack space="$3" alignItems="center" flexDirection="row">
                  <Text fontSize="$4" color="$orange11" fontWeight="500">
                    Status:
                  </Text>
                  <Text fontSize="$4" color="$orange12" fontWeight="600" textTransform="capitalize">
                    {client.status}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Card>

          {/* Action Buttons */}
          <Stack space="$3" marginTop="$4">
            <Button
              size="$4"
              backgroundColor="$blue6"
              color="white"
              fontWeight="600"
              onPress={() => {
                // TODO: Implement workout session functionality
                console.log('Start workout session for:', client.name);
              }}
              hoverStyle={{ backgroundColor: '$blue7' }}
              pressStyle={{ backgroundColor: '$blue8' }}
            >
              Start Workout Session
            </Button>
            
            <Button
              size="$4"
              backgroundColor="$gray6"
              color="white"
              fontWeight="600"
              onPress={() => router.back()}
              hoverStyle={{ backgroundColor: '$gray7' }}
              pressStyle={{ backgroundColor: '$gray8' }}
            >
              Back to Clients
            </Button>
          </Stack>
        </Stack>
      </ScrollView>
      </Stack>
    </SafeAreaView>
  );
}
