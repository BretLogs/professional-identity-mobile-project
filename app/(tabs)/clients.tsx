import { Button } from '@tamagui/button';
import { Stack, Text } from '@tamagui/core';

export default function ClientsScreen() {
  return (
    <Stack flex={1} backgroundColor="$background" padding="$4">
      <Stack space="$4" alignItems="center" justifyContent="center" flex={1}>
        <Text fontSize="$8" fontWeight="bold" color="$color" textAlign="center">
          Clients
        </Text>
        <Text fontSize="$4" color="$colorTransparent" textAlign="center">
          Manage your professional relationships
        </Text>
        
        <Stack space="$3" width="100%" maxWidth={300}>
          <Button
            size="$4"
            backgroundColor="$green6"
            color="white"
            fontWeight="600"
            width="100%"
            hoverStyle={{ backgroundColor: '$green7' }}
            pressStyle={{ backgroundColor: '$green8' }}
          >
            Add New Client
          </Button>
          
          <Button
            size="$4"
            backgroundColor="$cyan6"
            color="white"
            fontWeight="600"
            width="100%"
            hoverStyle={{ backgroundColor: '$cyan7' }}
            pressStyle={{ backgroundColor: '$cyan8' }}
          >
            View All Clients
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
