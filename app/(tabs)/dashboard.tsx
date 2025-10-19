import { Button } from '@tamagui/button';
import { Stack, Text } from '@tamagui/core';

export default function DashboardScreen() {
  return (
    <Stack flex={1} backgroundColor="$background" padding="$4">
      <Stack space="$4" alignItems="center" justifyContent="center" flex={1}>
        <Text fontSize="$8" fontWeight="bold" color="$color" textAlign="center">
          Welcome to Dashboard
        </Text>
        <Text fontSize="$4" color="$colorTransparent" textAlign="center">
          Your professional identity hub
        </Text>
        
        <Stack space="$3" width="100%" maxWidth={300}>
          <Button
            size="$4"
            backgroundColor="$purple8"
            color="white"
            fontWeight="600"
            width="100%"
            hoverStyle={{ backgroundColor: '$purple9' }}
            pressStyle={{ backgroundColor: '$purple10' }}
          >
            Purple Action
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
            Cyan Action
          </Button>
          
          <Button
            size="$4"
            backgroundColor="$orange6"
            color="white"
            fontWeight="600"
            width="100%"
            hoverStyle={{ backgroundColor: '$orange7' }}
            pressStyle={{ backgroundColor: '$orange8' }}
          >
            Orange Action
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
