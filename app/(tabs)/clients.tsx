/**
 * Clients Screen Component
 * Manages client relationships and interactions
 * Following Clean Code principles with clear separation of concerns
 */

import { Button } from '@tamagui/button';
import { Card } from '@tamagui/card';
import { Stack, Text } from '@tamagui/core';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useClient } from '../../src/hooks/useClient';

export default function ClientsScreen() {
  const { 
    clients, 
    isLoading, 
    error, 
    loadClients, 
    createClient, 
    selectClient 
  } = useClient();

  // Load clients on component mount
  useEffect(() => {
    loadClients();
  }, []);

  /**
   * Handles adding a new client
   * Creates a sample client for demonstration
   */
  const handleAddClient = async () => {
    const sampleClient = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      company: 'Sample Company',
    };

    const success = await createClient(sampleClient);
    if (success) {
      console.log('Client added successfully');
    } else {
      console.log('Failed to add client');
    }
  };

  return (
    <Stack flex={1} backgroundColor="$background" padding="$4">
      <Stack space="$4" alignItems="center" justifyContent="center" flex={1}>
        <Text fontSize="$8" fontWeight="bold" color="$color" textAlign="center">
          Clients
        </Text>
        <Text fontSize="$4" color="$colorTransparent" textAlign="center">
          Manage your professional relationships
        </Text>
        
        {/* Error Display */}
        {error && (
          <Card padding="$3" backgroundColor="$red2" borderColor="$red6">
            <Text color="$red10" textAlign="center">
              {error}
            </Text>
          </Card>
        )}

        {/* Client List */}
        {clients.length > 0 && (
          <ScrollView style={{ width: '100%', maxHeight: 300 }}>
            <Stack space="$2">
              {clients.map((client) => (
                <Card 
                  key={client.id} 
                  padding="$3" 
                  backgroundColor="$blue1" 
                  borderColor="$blue3"
                  onPress={() => selectClient(client)}
                >
                  <Stack space="$2">
                    <Text fontWeight="600" color="$blue10">
                      {client.name}
                    </Text>
                    <Text fontSize="$2" color="$blue8">
                      {client.email}
                    </Text>
                    {client.company && (
                      <Text fontSize="$2" color="$blue7">
                        {client.company}
                      </Text>
                    )}
                  </Stack>
                </Card>
              ))}
            </Stack>
          </ScrollView>
        )}
        
        <Stack space="$3" width="100%" maxWidth={300}>
          <Button
            size="$4"
            backgroundColor="$green6"
            color="white"
            fontWeight="600"
            width="100%"
            onPress={handleAddClient}
            disabled={isLoading}
            hoverStyle={{ backgroundColor: '$green7' }}
            pressStyle={{ backgroundColor: '$green8' }}
          >
            {isLoading ? 'Adding...' : 'Add New Client'}
          </Button>
          
          <Button
            size="$4"
            backgroundColor="$cyan6"
            color="white"
            fontWeight="600"
            width="100%"
            onPress={loadClients}
            disabled={isLoading}
            hoverStyle={{ backgroundColor: '$cyan7' }}
            pressStyle={{ backgroundColor: '$cyan8' }}
          >
            {isLoading ? 'Loading...' : 'Refresh Clients'}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
