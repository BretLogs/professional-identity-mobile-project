import { Stack, Text } from '@tamagui/core';

export default function DashboardScreen() {
  return (
    <Stack flex={1} backgroundColor="$gray8" padding="$4">
      <Stack space="$4" alignItems="center" justifyContent="center" flex={1}>
        <Text fontSize="$6" fontWeight="bold" color="$color" textAlign="center">Dashboard</Text>
      </Stack>
    </Stack>
  );
}
