import React, { PropTypes } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';

import { loadSchedule, displayMap } from '../../actions';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#000000',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 40,
    width: 60,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#000000',
  },
});

const Bar = ({ refresh, map }) => {
  const pressRefresh = () => { refresh(); };
  const pressMap = () => { map(true); };

  return (
    <View style={styles.bar}>
      <TouchableHighlight style={styles.button} onPress={pressRefresh}>
        <Text style={styles.buttonText}>
          Refresh
        </Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={pressMap}>
        <Text style={styles.buttonText}>
          Map
        </Text>
      </TouchableHighlight>
    </View>
  );
};

Bar.propTypes = {
  refresh: PropTypes.func.isRequired,
  map: PropTypes.func.isRequired,
};

export default connect(null, { refresh: loadSchedule, map: displayMap })(Bar);
