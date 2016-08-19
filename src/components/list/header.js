import React, { PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 25,
    paddingRight: 25,
    height: 30,
    justifyContent: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 18,
  },
});

const Header = ({ data }) =>
(
  <View style={styles.header}>
    <Text style={styles.headerText}>{data.moment.format('dddd, hh:mm a')}</Text>
  </View>
);

Header.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Header;
