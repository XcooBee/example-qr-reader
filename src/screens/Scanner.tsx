import React, { useCallback, useLayoutEffect } from 'react';
import { Buffer } from 'buffer';
import { Path } from 'path-parser';
import { Button, IconButton, View } from 'native-base';
import { BasketIcon, CameraScanner } from '../components';
import { SecurePayItem } from '../models';
import { useBasket } from '../hooks';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../Navigation';

enum UrlParams {
  CAMPAIGN_REF = 'campaignRef',
  FORM_REF = 'formRef',
  DATA = 'd',
}

const securePayUrl = 'https://app.xcoobee.net/securePay/';
const path = new Path(`:${UrlParams.CAMPAIGN_REF}/:${UrlParams.FORM_REF}?:${UrlParams.DATA}`);

export const Scanner: React.FC = () => {
  const basket = useBasket();
  const navigation = useNavigation<NavigationProp<RootNavigationProps>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BasketIcon
          badge={basket.items.length}
          onPress={() => navigation.navigate('Basket')}
        />
      ),
    });
  }, [navigation, basket]);

  const scanCallback = useCallback((scannedItems: SecurePayItem[]) => {
    scannedItems.forEach((value) => basket.addItem(value));
  }, [basket]);

  return (
    <View style={{ flex: 1 }}>
      <CameraScanner
        onDataScanned={(data) => {
          const part = data.replace(securePayUrl, '');
          const test = path.partialTest(part);

          if (test === null) {
            console.warn('QR Data is not recognized');
            return false;
          }

          const campaignRef = test[UrlParams.CAMPAIGN_REF];
          const formRef = test[UrlParams.FORM_REF];

          // Data parameter is encoded to Base64
          const decodedJson = Buffer.from(test[UrlParams.DATA], 'base64').toString();
          // Data contains list of items.
          const decodedData = JSON.parse(decodedJson) as Array<any>;
          // Map all data items.
          const secPayItems = decodedData.map((el) => SecurePayItem.fromData(campaignRef, formRef, el));

          scanCallback(secPayItems);

          return true;
        }}
      />
    </View>
  );
};
