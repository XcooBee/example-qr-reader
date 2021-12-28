import React from 'react';
import { Column, Image, Row, Text, View } from 'native-base';
import { useBasket } from '../hooks';
import { BasketItem } from '../components';
import { Colors } from '../utils';

export const Basket: React.FC = () => {
  const basket = useBasket();

  return (
    <View>
      <Row style={{
        padding: 20,
        alignItems: 'center'
      }}>
        <View style={{
          flex: 1,
        }}>
          <Column>
            <Text>Total:</Text>
            <Text style={{
              fontSize: 18,
              color: Colors.brand,
            }}>
              $ {basket.toTotal()}
            </Text>
            <Text>
              Included tax: $ {basket.toTax()}
            </Text>
          </Column>
        </View>
        <Image source={require('../../assets/xcoobee-bee.png')}
               style={{ height: 50, width: 50, resizeMode: 'stretch', }}
               alt="XcooBee Logo"/>
      </Row>
      <Text style={{
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
      }}>
        Pay To: ~xcoobee
      </Text>
      <Text style={{
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
      }}>
        XcooBee
      </Text>

      {basket.items.map((e, index) => (
        <BasketItem
          item={e}
          quantity={1}
          onChange={(qty) => {
          }}
          onRemove={() => basket.removeItem(index)}
        />
      ))}
    </View>
  );
};
