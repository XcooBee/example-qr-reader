import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, View } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { ScannerOverlay } from '../ScannerOverlay';

type Props = {
  disabled?: boolean;
  onDataScanned: (scannedData: string) => boolean;
};

export const CameraScanner: React.FC<Props> = ({
  onDataScanned
}) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = useCallback(({ data }) => {
    setScanned(onDataScanned(data) ?? false);
  }, [onDataScanned]);

  if (!hasPermission) {
    return (
      <Text>
        No access to camera
      </Text>
    );
  }

  return (
    <View style={{flex: 1,}}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <ScannerOverlay/>
    </View>
  );
};
