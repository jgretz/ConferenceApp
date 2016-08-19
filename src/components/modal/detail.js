import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import autobind from 'class-autobind';
import { connect } from 'react-redux';

import { Button } from '../controls';
import { selectSession } from '../../actions';

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
    alignItems: 'flex-start',
    flex: 1,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalPresenter: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  modalStage: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalTimes: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalDescription: {
    marginBottom: 20,
  },
});

class DetailModalClass extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      modalShown: false,
      modalData: props.selectedSession,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalShown: nextProps.selectedSession != null,
      modalData: nextProps.selectedSession,
    });
  }

  render() {
    const { modalData } = this.state;

    const close = () => {
      this.props.selectSession(null);
    };

    const renderContent = () => {
      if (!modalData) {
        return null;
      }

      return (
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{modalData.title}</Text>
          <Text style={styles.modalPresenter}>{modalData.presenter}</Text>
          <Text style={styles.modalTimes}>{modalData.start} - {modalData.end}</Text>
          <Text style={styles.modalStage}>{modalData.stage}</Text>
          <Text style={styles.modalDescription}>{modalData.description}</Text>
          <Button onPress={close}>Close</Button>
        </View>
      );
    };

    return (
      <Modal
        style={styles.modal}
        transparent
        animationType="fade"
        visible={this.state.modalShown}
      >
        {renderContent()}
      </Modal>
    );
  }
}

DetailModalClass.propTypes = {
  selectedSession: PropTypes.object,
  selectSession: PropTypes.func.isRequired,
};

export const DetailModal = connect( // eslint-disable-line
  ({ selectedSession }) => ({ selectedSession }),
  { selectSession }
)(DetailModalClass);
