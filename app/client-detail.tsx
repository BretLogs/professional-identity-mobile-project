/**
 * Client Detail Screen Component
 * Displays detailed client information with tab navigation
 * Following Clean Code principles with clear separation of concerns
 */

import { Button } from '@tamagui/button';
import { Card } from '@tamagui/card';
import { Stack, Text } from '@tamagui/core';
import { ChevronDown, Copy, Edit3, FileText, Mail, Ruler, User, UserCheck, Weight } from '@tamagui/lucide-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useClient } from '../src/hooks/useClient';
import { Client } from '../src/models/Client';
import { WorkoutSession } from '../src/models/Workout';
import { WorkoutService } from '../src/services/WorkoutService';

export default function ClientDetailScreen() {
  const router = useRouter();
  const { clientId } = useLocalSearchParams<{ clientId: string }>();
  const { clients, selectClient } = useClient();
  const [client, setClient] = useState<Client | null>(null);
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([]);
  const [activeTab, setActiveTab] = useState('client');
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadClientData = async () => {
      console.log('Loading client data for ID:', clientId);
      console.log('Available clients in store:', clients.length);
      
      if (clientId) {
        // First try to find client in the store
        if (clients.length > 0) {
          const foundClient = clients.find((c: Client) => c.id === clientId);
          console.log('Found client in store:', foundClient ? (foundClient as Client).name : 'Unknown');
          if (foundClient) {
            setClient(foundClient);
            selectClient(foundClient);
            
            // Load workout sessions for this client
            const workoutService = WorkoutService.getInstance();
            const sessions = workoutService.getClientWorkouts(clientId);
            setWorkoutSessions(sessions);
            return;
          }
        }
        
        // If not found in store, load directly from JSON
        try {
          console.log('Loading clients from JSON file...');
          const clientsData = require('../src/data/clients.json');
          const clientsWithDates = clientsData.clients.map((client: any) => ({
            ...client,
            createdAt: new Date(client.createdAt),
            lastContactAt: client.lastCheckedDate ? new Date(client.lastCheckedDate) : undefined,
          }));
          
          console.log('Loaded clients from JSON:', clientsWithDates.length);
          const foundClient = clientsWithDates.find((c: Client) => c.id === clientId);
          console.log('Found client in JSON:', foundClient?.name);
          
          if (foundClient) {
            setClient(foundClient);
            selectClient(foundClient);
            
            // Load workout sessions for this client
            const workoutService = WorkoutService.getInstance();
            const sessions = workoutService.getClientWorkouts(clientId);
            setWorkoutSessions(sessions);
          } else {
            console.log('Client not found with ID:', clientId);
            console.log('Available client IDs:', clientsWithDates.map((c: Client) => c.id));
          }
        } catch (error) {
          console.error('Error loading client data:', error);
        }
      }
    };

    loadClientData();
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

  // Gender-specific colors and assets
  const isFemale = client.gender === 'female';
  const primaryColor = isFemale ? '#EC6C6C' : '#00991A';
  const lightColor = isFemale ? '#FDF2F2' : '#F0FFF4';
  const imageSource = isFemale 
    ? require('../assets/images/red_girl_workout.png')
    : require('../assets/images/green_guy_workout.png');

  const getGenderIcon = (gender: 'male' | 'female') => {
    return gender === 'male' ? User : UserCheck;
  };

  const handleCopyWorkout = (workoutText: string) => {
    Alert.alert('Copied!', 'Workout has been copied to clipboard');
    // In a real app, you would use Clipboard API here
    console.log('Copied workout:', workoutText);
  };

  const handleEditWorkout = (sessionId: string) => {
    Alert.alert('Edit Workout', `Edit workout session: ${sessionId}`);
    // In a real app, you would navigate to edit screen or open modal
    console.log('Edit workout session:', sessionId);
  };

  const toggleSessionExpanded = (sessionId: string) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSessions(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Stack flex={1} backgroundColor="$background">
        {/* Header Section */}
        <Stack 
          backgroundColor={primaryColor}
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
                return <GenderIcon size={40} color={primaryColor} />;
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
                <Text fontSize="$3" color="rgba(255,255,255,0.8)" textAlign="center">
                  Weight
                </Text>
                <Text fontSize="$5" fontWeight="600" color="white" textAlign="center">
                  {client.weight}
                </Text>
              </Stack>
              
              <Stack alignItems="center" space="$2">
                <Text fontSize="$3" color="rgba(255,255,255,0.8)" textAlign="center">
                  Height
                </Text>
                <Text fontSize="$5" fontWeight="600" color="white" textAlign="center">
                  {client.height}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* Tab Navigation */}
        <Stack flex={1} backgroundColor="$background">
          <Stack backgroundColor="$gray2" borderBottomWidth={1} borderBottomColor="$gray4" flexDirection="row">
            <Button
              flex={1}
              backgroundColor={activeTab === 'client' ? primaryColor : 'transparent'}
              borderRadius={0}
              onPress={() => setActiveTab('client')}
              padding="$4"
            >
              <Text color={activeTab === 'client' ? 'white' : '$gray11'} fontWeight="600">
                Client
              </Text>
            </Button>
            <Button
              flex={1}
              backgroundColor={activeTab === 'workouts' ? primaryColor : 'transparent'}
              borderRadius={0}
              onPress={() => setActiveTab('workouts')}
              padding="$4"
            >
              <Text color={activeTab === 'workouts' ? 'white' : '$gray11'} fontWeight="600">
                Workouts
              </Text>
            </Button>
          </Stack>

          {/* Client Tab Content */}
          {activeTab === 'client' && (
            <ScrollView style={{ flex: 1 }}>
              <Stack padding="$4" space="$4">
                {/* Client Image */}
                <Card padding="$4" backgroundColor={lightColor} borderColor={primaryColor}>
                  <Stack space="$3" alignItems="center">
                    <Text fontSize="$5" fontWeight="600" color="$gray12">
                      Client Photo
                    </Text>
                    <Image 
                      source={imageSource}
                      style={{ 
                        width: 200, 
                        height: 200, 
                        borderRadius: 12,
                        resizeMode: 'contain'
                      }}
                    />
                  </Stack>
                </Card>

                {/* Email Information */}
                <Card padding="$4" backgroundColor="$gray1" borderColor="$gray3">
                  <Stack space="$3" alignItems="center" flexDirection="row">
                    <Mail size={20} color={primaryColor} />
                    <Text fontSize="$4" color="$gray11" fontWeight="500">
                      Email:
                    </Text>
                    <Text fontSize="$4" color="$gray12">
                      {client.email}
                    </Text>
                  </Stack>
                </Card>

                {/* Gender Information */}
                <Card padding="$4" backgroundColor="$gray1" borderColor="$gray3">
                  <Stack space="$3" alignItems="center" flexDirection="row">
                    {(() => {
                      const GenderIcon = getGenderIcon(client.gender);
                      return <GenderIcon size={20} color={primaryColor} />;
                    })()}
                    <Text fontSize="$4" color="$gray11" fontWeight="500">
                      Gender:
                    </Text>
                    <Text fontSize="$4" color="$gray12" textTransform="capitalize">
                      {client.gender}
                    </Text>
                  </Stack>
                </Card>

                {/* Weight and Height */}
                <Card padding="$4" backgroundColor="$gray1" borderColor="$gray3">
                  <Stack space="$3">
                    <Stack space="$3" alignItems="center" flexDirection="row">
                      <Weight size={20} color={primaryColor} />
                      <Text fontSize="$4" color="$gray11" fontWeight="500">
                        Weight:
                      </Text>
                      <Text fontSize="$4" color="$gray12">
                        {client.weight}
                      </Text>
                    </Stack>
                    <Stack space="$3" alignItems="center" flexDirection="row">
                      <Ruler size={20} color={primaryColor} />
                      <Text fontSize="$4" color="$gray11" fontWeight="500">
                        Height:
                      </Text>
                      <Text fontSize="$4" color="$gray12">
                        {client.height}
                      </Text>
                    </Stack>
                  </Stack>
                </Card>

                {/* Description */}
                <Card padding="$4" backgroundColor="$gray1" borderColor="$gray3">
                  <Stack space="$3">
                    <Stack space="$3" alignItems="center" flexDirection="row">
                      <FileText size={20} color={primaryColor} />
                      <Text fontSize="$5" fontWeight="600" color="$gray12">
                        About {client.name}
                      </Text>
                    </Stack>
                    <Text fontSize="$4" color="$gray11" lineHeight="$6">
                      {client.description}
                    </Text>
                  </Stack>
                </Card>
              </Stack>
            </ScrollView>
          )}

          {/* Workouts Tab Content */}
          {activeTab === 'workouts' && (
            <ScrollView style={{ flex: 1 }}>
              <Stack padding="$4" space="$4">
                {workoutSessions.length === 0 ? (
                  <Card padding="$6" backgroundColor="$gray1" borderColor="$gray3">
                    <Stack space="$3" alignItems="center">
                      <Text fontSize="$5" fontWeight="600" color="$gray12">
                        No Workouts Yet
                      </Text>
                      <Text fontSize="$4" color="$gray11" textAlign="center">
                        This client doesn't have any workout sessions recorded.
                      </Text>
                    </Stack>
                  </Card>
                ) : (
                  <Stack space="$2">
                    {workoutSessions.map((session) => {
                      const isExpanded = expandedSessions.has(session.id);
                      return (
                        <Card key={session.id} backgroundColor="$gray1" borderColor="$gray3" borderWidth={1} borderRadius="$4">
                          <Button
                            backgroundColor="transparent"
                            padding="$4"
                            onPress={() => toggleSessionExpanded(session.id)}
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                          >
                            <Stack space="$2" flex={1} alignItems="flex-start">
                              <Text fontSize="$5" fontWeight="600" color="$gray12">
                                {session.day}
                              </Text>
                              <Text fontSize="$4" color="$gray11">
                                {formatDate(session.date)}
                              </Text>
                            </Stack>
                            <ChevronDown 
                              size={20} 
                              color="$gray9" 
                              style={{ 
                                transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] 
                              }} 
                            />
                          </Button>
                          
                          {isExpanded && (
                            <Stack 
                              backgroundColor="$gray1"
                              borderTopWidth={1}
                              borderTopColor="$gray3"
                              padding="$4"
                              space="$4"
                            >
                              <Text fontSize="$4" color="$gray12" lineHeight="$6">
                                {session.workouts}
                              </Text>
                              
                              <Stack space="$3" flexDirection="row" justifyContent="flex-end">
                                <Button
                                  size="$3"
                                  backgroundColor="$gray6"
                                  color="white"
                                  onPress={() => handleCopyWorkout(session.workouts)}
                                >
                                  <Copy size={16} />
                                  <Text marginLeft="$2" color="white">Copy</Text>
                                </Button>
                                <Button
                                  size="$3"
                                  backgroundColor={primaryColor}
                                  color="white"
                                  onPress={() => handleEditWorkout(session.id)}
                                >
                                  <Edit3 size={16} />
                                  <Text marginLeft="$2" color="white">Edit</Text>
                                </Button>
                              </Stack>
                            </Stack>
                          )}
                        </Card>
                      );
                    })}
                  </Stack>
                )}
              </Stack>
            </ScrollView>
          )}
        </Stack>

        {/* Back Button */}
        <Stack padding="$4" backgroundColor="$background">
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
    </SafeAreaView>
  );
}