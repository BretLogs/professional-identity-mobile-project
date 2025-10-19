import { Stack, Text } from '@tamagui/core';

export default function ClientsScreen() {
  return (
    <Stack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
      <Text fontSize="$6" fontWeight="200" color="$color">
        Clients Page
      </Text>
    </Stack>
  );
}
