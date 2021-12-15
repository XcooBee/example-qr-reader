import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Column, Icon, Row, Text, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { SecurePayItem } from '../models';
import { Colors } from '../utils';

type Props = {
  item: SecurePayItem,
  quantity: number,
  onChange: (quantity: number) => void,
  onRemove: () => void,
};

export const BasketItem: React.FC<Props> = ({ item, quantity , onChange, onRemove }) => {
  return (
    <View style={{
      margin: 10,
      borderColor: 'grey',
      borderWidth: 1.0,
      borderRadius: 10,
      overflow: 'hidden'
    }}>
      <Row>
        <View style={{
          padding: 10,
          flex: 1,
          justifyContent: 'center',
        }}>
          <Row>
            <View style={{
              justifyContent: 'center',
            }}>
              <TouchableHighlight onPress={onRemove}>
                <Icon
                  as={Ionicons}
                  name="close-circle"
                  size={5}
                />
              </TouchableHighlight>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
              <Text style={{
                fontSize: 16,
              }}>
                {item.reference}
              </Text>
            </View>
            <Column>
              <Text style={{
                textAlign: 'right',
                fontSize: 16,
                color: Colors.brand
              }}>
                $ {item.amount.toFixed(2)}
              </Text>
              <Text style={{
                textAlign: 'right',
                fontSize: 12,
              }}>
                Included tax: $ {item.tax.toFixed(2)}
              </Text>
            </Column>
          </Row>
        </View>
        <View style={{
          padding: 5,
          backgroundColor: Colors.brand,
        }}>
          <TouchableHighlight onPress={() => onChange(quantity + 1)}>
            <Icon
              as={Ionicons}
              name="add-circle"
              color="white"
              size={5}
            />
          </TouchableHighlight>
          <Text style={{
            marginVertical: 5,
            textAlign: 'center',
            color: 'white',
          }}>
            {quantity}
          </Text>
          <TouchableHighlight onPress={() => onChange(quantity - 1)}>
            <Icon
              as={Ionicons}
              name="remove-circle"
              color="white"
              size={5}
            />
          </TouchableHighlight>
        </View>
      </Row>
    </View>
  );
};
