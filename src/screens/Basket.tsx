import React from 'react';
import { Column, Row, Text, View } from 'native-base';
import { useBasket } from '../hooks';
import { BasketItem } from '../components';
import { Colors } from '../utils';

export const Basket: React.FC = () => {
  const basket = useBasket();

  return (
    <View>
      <Row style={{
        padding: 20,
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
        <View style={{
          flex: 0,
          width: 80,
          height: 80,
          backgroundColor: 'grey'
        }}/>
      </Row>
      <Text>Pay To: ~xcoobee</Text>
      <Text>XcooBee</Text>

      {basket.items.map((e) => (
        <BasketItem
          item={e}
          quantity={1}
          onChange={(qty) => {

          }}
          onRemove={() => {

          }}
        />
      ))}
    </View>
  );
};
