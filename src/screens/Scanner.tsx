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

enum DataParams {
  amount = '0-3',
  tax = '0-5',
  reference = '0-6',
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

          const decodedJson = Buffer.from(test[UrlParams.DATA], 'base64').toString();
          const decodedData = JSON.parse(decodedJson) as Array<any>;

          const secPayItems = decodedData.map((el) => new SecurePayItem(el[DataParams.amount],
            el[DataParams.tax],
            el[DataParams.reference]));

          console.log('url', secPayItems);

          return true;
        }}
      />
    </View>
  );
};
