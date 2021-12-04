import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 0,
    left: 0,
    top: 0,
    borderColor: '#0000009B'
  },
  animatedLine: {
    position: 'relative',
    borderTopWidth: 2,
    borderTopColor: 'red'
  },
  cornerBorder: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderColor: 'yellow',
    borderWidth: 2,
  }
});
