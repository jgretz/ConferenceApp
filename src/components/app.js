import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { loadSchedule } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class App extends Component {
  componentWillMount() {
    this.props.loadSchedule();
  }

  render() {
    console.log(this.props.sessions);

    return (
      <View style={styles.container} />
    );
  }
}

App.propTypes = {
  sessions: PropTypes.array.isRequired,
  loadSchedule: PropTypes.func.isRequired,
};

export default connect(({ sessions }) => ({ sessions }), { loadSchedule })(App);
