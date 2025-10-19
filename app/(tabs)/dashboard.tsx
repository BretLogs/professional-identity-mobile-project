/**
 * Dashboard Screen Component
 * Displays professional identity and performance metrics
 * Following Clean Code principles with clear separation of concerns
 */

import { Button } from '@tamagui/button';
import { Card } from '@tamagui/card';
import { Stack, Text } from '@tamagui/core';
import { Input } from '@tamagui/input';
import { Copy, Facebook, Globe, Instagram, TrendingUp, Users } from '@tamagui/lucide-icons';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useAuth } from '../../src/hooks/useAuth';
import { useClient } from '../../src/hooks/useClient';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { clients, loadClients } = useClient();

  // Load clients on component mount
  useEffect(() => {
    loadClients();
  }, []);

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#f8f5ff' }} 
      contentContainerStyle={{ padding: 16 }} 
      showsVerticalScrollIndicator={false}
    >
      {/* Professional Header */}
      <Stack space="$3" alignItems="center" paddingTop="$8" marginBottom="$4">
        <Text fontSize="$8" fontWeight="bold" textAlign="center" color="$color">
          Get your identity
        </Text>
        <Text fontSize="$3" color="$colorTransparent" textAlign="center">
          Share your professional presence across all platforms
        </Text>
      </Stack>

      {/* Social Media Cards */}
      <Stack space="$4">
        {/* Web Card */}
        <Card 
          padding="$4" 
          backgroundColor="$purple1" 
          borderColor="$purple3"
          borderRadius="$4"
          shadowColor="$purple8"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={8}
          elevation={3}
        >
          <Stack flexDirection="row" alignItems="center" space="$3">
            <Stack 
              backgroundColor="$purple8" 
              borderRadius="$3" 
              padding="$2"
              alignItems="center"
              justifyContent="center"
            >
              <Globe size="$1.5" color="white" />
            </Stack>
            <Input
              flex={1}
              value="www.sample_company.com"
              disabled
              backgroundColor="white"
              borderColor="$purple4"
              color="$color"
              borderRadius="$3"
            />
            <Button 
              size="$3" 
              backgroundColor="transparent" 
              color="$purple8"
              borderRadius="$3"
              fontWeight="600"
              hoverStyle={{ backgroundColor: '$purple9' }}
              pressStyle={{ backgroundColor: '$purple10' }}
            >
              <Copy size="$1" color="$purple8"/>
            </Button>
          </Stack>
        </Card>

        {/* Instagram Card */}
        <Card 
          padding="$4" 
          backgroundColor="$orange1" 
          borderColor="$orange3"
          borderRadius="$4"
          shadowColor="$orange8"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={8}
          elevation={3}
        >
          <Stack flexDirection="row" alignItems="center" space="$3">
            <Stack 
              backgroundColor="$orange8" 
              borderRadius="$3" 
              padding="$2"
              alignItems="center"
              justifyContent="center"
            >
              <Instagram size="$1.5" color="white" />
            </Stack>
            <Input
              flex={1}
              value="www.instagram.com/sample_company"
              disabled
              backgroundColor="white"
              borderColor="$orange4"
              color="$color"
              borderRadius="$3"
            />
            <Button 
              size="$3" 
              backgroundColor="transparent" 
              color="$orange8"
              borderRadius="$3"
              fontWeight="600"
              hoverStyle={{ backgroundColor: '$orange9' }}
              pressStyle={{ backgroundColor: '$orange10' }}
            >
              <Copy size="$1" color="$orange8"/>
            </Button>
          </Stack>
        </Card>

        {/* Facebook Card */}
        <Card 
          padding="$4" 
          backgroundColor="$cyan1" 
          borderColor="$cyan3"
          borderRadius="$4"
          shadowColor="$cyan8"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={8}
          elevation={3}
        >
          <Stack flexDirection="row" alignItems="center" space="$3">
            <Stack 
              backgroundColor="$cyan8" 
              borderRadius="$3" 
              padding="$2"
              alignItems="center"
              justifyContent="center"
            >
              <Facebook size="$1.5" color="white" />
            </Stack>
            <Input
              flex={1}
              value="www.facebook.com/sample_company"
              disabled
              backgroundColor="white"
              borderColor="$cyan4"
              color="$color"
              borderRadius="$3"
            />
            <Button 
              size="$3" 
              backgroundColor="transparent" 
              color="$cyan8"
              borderRadius="$3"
              fontWeight="600"
              hoverStyle={{ backgroundColor: '$cyan9' }}
              pressStyle={{ backgroundColor: '$cyan10' }}
            >
              <Copy size="$1" color="$cyan8"/>
            </Button>
          </Stack>
        </Card>
      </Stack>

      {/* Stats Section */}
      <Stack space="$4" marginTop="$4">
        {/* Stats Card */}
        <Card 
          padding="$6" 
          backgroundColor="white"
          borderColor="$purple3"
          borderRadius="$5"
          shadowColor="$purple8"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.15}
          shadowRadius={12}
          elevation={5}
        >
          <Stack alignItems="center" space="$4">
            <Text fontSize="$5" fontWeight="bold" color="$color" textAlign="center">
              My Performance
            </Text>
            <Stack 
              backgroundColor="$purple2" 
              borderRadius="$4" 
              padding="$4"
              alignItems="center"
              justifyContent="center"
              width={80}
              height={80}
            >
              <Users size="$3" color="$purple8" />
            </Stack>
            
            <Stack alignItems="center" space="$2">
              <Text fontSize="$4" color="$colorTransparent" textAlign="center" fontWeight="500">
                Total Clients
              </Text>
              <Text fontSize="$7" fontWeight="bold" color="$purple8">{clients.length}</Text>
              <Stack flexDirection="row" alignItems="center" space="$2">
                <TrendingUp size="$1" color="$green8" />
                <Text fontSize="$2" color="$green8" fontWeight="600">
                  +12% this month
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Additional Stats Row */}
        {/* <Stack flexDirection="row" space="$3">
          <Card 
            flex={1} 
            padding="$4" 
            backgroundColor="$green1"
            borderColor="$green3"
            borderRadius="$4"
            shadowColor="$green8"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={6}
            elevation={2}
          >
            <Stack alignItems="center" space="$2">
              <Star size="$1.5" color="$green8" />
              <Text fontSize="$2" color="$green8" fontWeight="600" textAlign="center">
                Rating
              </Text>
              <Text fontSize="$4" fontWeight="bold" color="$green8">4.9</Text>
            </Stack>
          </Card>

          <Card 
            flex={1} 
            padding="$4" 
            backgroundColor="$cyan1"
            borderColor="$cyan3"
            borderRadius="$4"
            shadowColor="$cyan8"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={6}
            elevation={2}
          >
            <Stack alignItems="center" space="$2">
              <TrendingUp size="$1.5" color="$cyan8" />
              <Text fontSize="$2" color="$cyan8" fontWeight="600" textAlign="center">
                Growth
              </Text>
              <Text fontSize="$4" fontWeight="bold" color="$cyan8">+24%</Text>
            </Stack>
          </Card>
        </Stack> */}
    </Stack>
    </ScrollView>
  );
}
