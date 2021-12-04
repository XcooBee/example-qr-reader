import React from 'react';
import { Button, Center, Code, Heading, HStack, Image, Text, VStack } from 'native-base';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ToggleDarkMode } from '../components';
import { RootNavigationProps } from '../Navigation';

export const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationProps>>();

  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Image source={require('../../assets/xcoobee-bee.png')}
               style={{ height: 150, width: 150, resizeMode: 'stretch', }}
               alt="XcooBee Logo"/>
        <Heading size="lg">
          Welcome to XcooBee QR Reader
        </Heading>
        <HStack space={2} alignItems="center">
          <Text>
            Edit
          </Text>
          <Code>
            App.tsx
          </Code>
          <Text>
            and save to reload.
          </Text>
        </HStack>

        <Button size="lg" onPress={() => navigation.navigate('Scanner')}>
          Scan QR
        </Button>

        <ToggleDarkMode/>
      </VStack>
    </Center>
  );
};
