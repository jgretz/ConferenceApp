import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { selectSession } from '../../actions';

const styles = StyleSheet.create({
  row: {
    height: 70,
    justifyContent: 'space-around',
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10,
  },
  rowTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  rowPresenter: {
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
});

const Row = ({ data, select }) => {
  const onPress = () => {
    select(data);
  };

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>{data.title}</Text>
        <Text style={styles.rowPresenter}>{data.presenter} - {data.stage}</Text>
      </View>
    </TouchableHighlight>
  );
};

Row.propTypes = {
  data: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(null, { select: selectSession })(Row);
