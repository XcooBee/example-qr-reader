import React, { ComponentProps, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'native-base';
import { Feather } from "@expo/vector-icons"

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type Props = Pick<ComponentProps<typeof TouchableOpacity>, 'onPress'> & {
  badge?: number;
};

const styles = StyleSheet.create({
  cartButton: {
    paddingLeft: 10,
    position: 'relative',
    alignItems: 'flex-end'
  },
  badgeContainer: {
    paddingHorizontal: 5,
    position: 'absolute',
    top: -5,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  badgeText: {
    fontSize: 10,
    color: 'black'
  },
});

export const BasketIcon: React.FC<Props> = ({
  badge = 0,
  onPress
}) => {
  const animated = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    if (badge > 0) {
      Animated.timing(animated, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start(() => animated.setValue(0));
    }
  }, [badge]);

  const iconSize = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.25]
  });

  const badgeLabel = useMemo(() => !!badge && (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>
        {badge}
      </Text>
    </View>
  ), [badge]);

  if (badge < 1) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cartButton}>
        <Icon
          as={Feather}
          name="shopping-cart"
          color="#F90"
        />
        {badgeLabel}
      </View>
    </TouchableOpacity>
  );
};
