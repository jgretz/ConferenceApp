import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import List from './list';
import { DetailModal } from './modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class App extends Component { // eslint-disable-line
  render() {
    return (
      <View style={styles.container}>
        <DetailModal />
        <List />
      </View>
    );
  }
}
