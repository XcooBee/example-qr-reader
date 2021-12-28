import React from 'react';
import { Button, Column, Image, Row, ScrollView, Text, View } from 'native-base';
import { useBasket } from '../hooks';
import { BasketItem } from '../components';
import { Colors } from '../utils';
import { SafeAreaView } from 'react-native';

export const Basket: React.FC = () => {
  const basket = useBasket();

  return (
    <View style={{
      flex: 1,
    }}>
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

      <ScrollView style={{
        flex: 1,
      }}>
        {basket.items.map((e, index) => (
          <BasketItem
            key={`item_${index}`}
            item={e}
            quantity={1}
            onChange={(qty) => {
            }}
            onRemove={() => basket.removeItem(index)}
          />
        ))}
      </ScrollView>
      <View style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
      }}>
        <SafeAreaView>
          <Button
            onPress={() => {
            }}
            backgroundColor={'yellow.500'}
          >
            <Text style={{
              fontSize: 18,
            }}>
              Checkout
            </Text>
          </Button>
        </SafeAreaView>
      </View>
    </View>
  );
};
