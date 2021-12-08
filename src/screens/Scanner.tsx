import React from 'react';
import { Buffer } from 'buffer';
import { Path } from 'path-parser';
import { View } from 'native-base';
import { CameraScanner } from '../components';
import { SecurePayItem } from '../models';

enum UrlParams {
  CAMPAIGN_REF = 'campaignRef',
  FORM_REF = 'formRef',
  DATA = 'd',
}

const securePayUrl = 'https://app.xcoobee.net/securePay/';
const path = new Path(`:${UrlParams.CAMPAIGN_REF}/:${UrlParams.FORM_REF}?:${UrlParams.DATA}`);

export const Scanner: React.FC = () => {

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

          console.log('Parsed Data', secPayItems);

          return true;
        }}
      />
    </View>
  );
};
