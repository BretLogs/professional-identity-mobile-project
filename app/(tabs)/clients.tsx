/**
 * Clients Screen Component
 * Manages client relationships and workout interactions
 * Following Clean Code principles with clear separation of concerns
 */

import { Button } from '@tamagui/button';
import { Card } from '@tamagui/card';
import { Stack, Text } from '@tamagui/core';
import { Dumbbell, PersonStanding, User, UserCheck } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useClient } from '../../src/hooks/useClient';
import { Client } from '../../src/models/Client';

export default function ClientsScreen() {
  const router = useRouter();
  const { 
    clients, 
    isLoading, 
    error, 
    loadClients, 
    createClient, 
    selectClient 
  } = useClient();
  const [mockClients, setMockClients] = useState<Client[]>([]);

  // Load mock clients data
  useEffect(() => {
    loadMockClients();
  }, []);

  /**
   * Loads mock clients data from JSON file
   * Simulates loading from a database
   */
  const loadMockClients = async () => {
    try {
      const clientsData = require('../../src/data/clients.json');
      const clientsWithDates = clientsData.clients.map((client: any) => ({
        ...client,
        createdAt: new Date(client.createdAt),
        lastContactAt: client.lastCheckedDate ? new Date(client.lastCheckedDate) : undefined,
      }));
      setMockClients(clientsWithDates);
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  /**
   * Handles navigation to client detail screen
   */
  const handleClientPress = (client: Client) => {
    selectClient(client);
    router.push(`/client-detail?clientId=${client.id}`);
  };

  /**
   * Gets gender icon for display
   */
  const getGenderIcon = (gender: 'male' | 'female') => {
    return gender === 'male' ? User : UserCheck;
  };

  /**
   * Generates a random color with transparency
   */
  const getRandomColor = (clientId: string) => {
    const colors = [ 
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
    ];
    const index = clientId.charCodeAt(0) % colors.length;
    return colors[index];
  };

  /**
   * Gets the background color with transparency
   */
  const getBackgroundColor = (clientId: string) => {
    const baseColor = getRandomColor(clientId);
    return `${baseColor}66`; // 40% transparency (66 in hex)
  };

  /**
   * Gets the border color with higher opacity
   */
  const getBorderColor = (clientId: string) => {
    const baseColor = getRandomColor(clientId);
    return `${baseColor}CC`; // 80% opacity (CC in hex)
  };

  return (
    <Stack flex={1} backgroundColor="$background">
      {/* Header Section */}
      <Stack padding="$4" paddingTop="$6" backgroundColor="$blue1" borderBottomLeftRadius="$4" borderBottomRightRadius="$4">
        <Stack space="$3" alignItems="center">
          <Text fontSize="$5" fontWeight="bold" color="$blue12" textAlign="center">
            My Clients
          </Text>
          <Text fontSize="$3" color="$blue10" textAlign="center" lineHeight="$6">
            Track your clients' fitness journey and workout progress
          </Text>
        </Stack>
      </Stack>

      {/* Content Section */}
      <Stack flex={1} padding="$4" backgroundColor="$gray1">
        {/* Error Display */}
        {error && (
          <Card padding="$3" backgroundColor="$red2" borderColor="$red6" marginBottom="$4">
            <Text color="$red10" textAlign="center">
              {error}
            </Text>
          </Card>
        )}

        {/* Client List */}
        {mockClients.length > 0 ? (
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Stack space="$3">
              {mockClients.map((client: Client) => {
                const GenderIcon = getGenderIcon(client.gender);
                return (
                <Card 
                  key={client.id} 
                  padding="$4" 
                  backgroundColor={getBackgroundColor(client.id)}
                  borderColor={getBorderColor(client.id)}
                  borderWidth={2}
                  borderRadius="$8"
                >
                  <Stack space="$4" alignItems="center" justifyContent="space-between" flexDirection="row">
                    {/* Left side - Gender icon and client info */}
                    <Stack space="$3" alignItems="center" flex={1} flexDirection="row">
                      {/* Gender Icon */}
                      <Stack 
                        width={50} 
                        height={50} 
                        backgroundColor="white" 
                        borderRadius="$6" 
                        justifyContent="center" 
                        alignItems="center"
                        borderWidth={1}
                        borderColor="$borderColor"
                      >
                        <PersonStanding size={24} color={getRandomColor(client.id)} />
                      </Stack>

                      {/* Client Information */}
                      <Stack space="$1" flex={1}>
                        <Text fontSize="$4" fontWeight="600" color="$gray10">
                          {client.name}
                        </Text>
                        <Text fontSize="$2.5" color="$gray7">
                          Last time checked: {client.lastChecked}
                        </Text>
                      </Stack>
                    </Stack>

                    {/* Right side - Workout button */}
                    <Button
                      size="$3"
                      // backgroundColor="transparent"
                      shadowColor="$shadowColor"
                      shadowOffset={{ width: 0, height: 2 }}
                      shadowOpacity={0.1}
                      shadowRadius={4}
                      elevation={2}
                      borderWidth={2}
                      borderColor={getBorderColor(client.id)}
                      borderRadius="$6"
                      paddingHorizontal="$3"
                      paddingVertical="$2"
                      height={40}
                      width={40}
                      onPress={() => handleClientPress(client)}
                      hoverStyle={{ 
                        backgroundColor: getBackgroundColor(client.id),
                        borderColor: getRandomColor(client.id)
                      }}
                      pressStyle={{ 
                        backgroundColor: getBackgroundColor(client.id),
                        borderColor: getRandomColor(client.id)
                      }}
                    >
                      <Dumbbell size={20} color={getRandomColor(client.id)} />
                    </Button>
                  </Stack>
                </Card>
                );
              })}
            </Stack>
          </ScrollView>
        ) : (
          <Stack flex={1} justifyContent="center" alignItems="center" space="$4">
            <Text fontSize="$6" color="$gray10" textAlign="center">
              No clients found
            </Text>
            <Text fontSize="$4" color="$gray8" textAlign="center">
              Add your first client to get started
            </Text>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
