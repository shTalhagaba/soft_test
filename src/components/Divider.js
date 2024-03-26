import React from 'react';
import {StyleSheet, View} from 'react-native';

const Divider = () => {
  return <View style={styles.dividerStyle} />;
};
const styles = StyleSheet.create({
  dividerStyle: {
    backgroundColor: 'Black',
    height: 1,
    width: '95%',
    alignSelf: 'center',
    margin: 5,
  },
});

export default Divider;
