import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Image, Modal } from 'react-native';
import autobind from 'class-autobind';
import { connect } from 'react-redux';

import { Button } from '../controls';
import { displayMap } from '../../actions';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },

  modalContainer: {
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,

    padding: 20,

    borderRadius: 12.5,
    borderColor: '#BABABA',
    borderWidth: 2,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalImage: {
    height: 400,
    width: 320,
    marginBottom: 20,
  },
});

class MapClass extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      modalShown: props.mapIsDisplayed,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalShown: nextProps.mapIsDisplayed,
    });
  }

  render() {
    const close = () => {
      this.props.displayMap(false);
    };

    return (
      <Modal
        style={styles.modal}
        transparent
        animationType="fade"
        visible={this.state.modalShown}
        onRequestClose={close}
      >
        <View style={styles.modalContainer}>
          <Image
            style={styles.modalImage}
            source={require('../../img/map.png')} // eslint-disable-line
          />
          <Button onPress={close}>Close</Button>
        </View>
      </Modal>
    );
  }
}

MapClass.propTypes = {
  mapIsDisplayed: PropTypes.bool.isRequired,
  displayMap: PropTypes.func.isRequired,
};

export const MapModal = connect( // eslint-disable-line
  ({ mapIsDisplayed }) => ({ mapIsDisplayed }),
  { displayMap }
)(MapClass);
