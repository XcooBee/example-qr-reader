import React, { useEffect, useRef } from 'react';
import { Animated, View, Dimensions, Easing, StatusBar} from 'react-native';
import { styles } from './Styles';
import { useHeaderHeight } from '@react-navigation/elements';

const {
  width: screenWidth,
  height: screenHeight
} = Dimensions.get('screen');

const MASK_OFFSET = 100;
const MASK_SIZE = screenWidth - MASK_OFFSET;
const MASK_H_OFFSET = (screenWidth - MASK_SIZE) / 2;
const MASK_V_OFFSET = (screenHeight - MASK_SIZE) / 2;

export const ScannerOverlay: React.FC = () => {
  const headerHeight = useHeaderHeight();
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(Animated.timing(animated, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }));
    animation.start();

    return () => animation.stop();
  }, []);

  const scanLinePosition = animated.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, MASK_SIZE - 4, 0]
  });

  return (
    <View
      style={[styles.container, {
        width: screenWidth,
        height: screenHeight,
        borderLeftWidth: MASK_H_OFFSET,
        borderRightWidth: MASK_H_OFFSET,
        borderTopWidth: MASK_V_OFFSET,
        borderBottomWidth: MASK_V_OFFSET,
        top: (headerHeight / 2 * -1),
      }]}
    >
      <Animated.View
        style={[styles.animatedLine, {
          top: scanLinePosition
        }]}
      />
      <View
        style={[styles.cornerBorder, {
          left: -2,
          top: -2,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderTopLeftRadius: 5
        }]}
      />
      <View
        style={[styles.cornerBorder, {
          top: -2,
          right: -2,
          borderLeftWidth: 0,
          borderBottomWidth: 0,
          borderTopRightRadius: 5
        }]}
      />
      <View
        style={[styles.cornerBorder, {
          bottom: -2,
          right: -2,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderBottomRightRadius: 5
        }]}
      />
      <View
        style={[styles.cornerBorder, {
          bottom: -2,
          left: -2,
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderBottomLeftRadius: 5
        }]}
      />
    </View>
  );
};
