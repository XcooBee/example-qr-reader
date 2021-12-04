import React from 'react';
import { View, Text } from 'native-base';
import { CameraScanner } from '../components';

export const Scanner: React.FC = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'red', }}>
      <CameraScanner
        onDataScanned={(data) => {
          console.log('data', data);
        }}
      />
    </View>
  );
};
