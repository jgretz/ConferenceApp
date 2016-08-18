import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class Host extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}
