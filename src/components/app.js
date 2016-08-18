import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View, Text, TouchableHighlight,
  ListView, RecyclerViewBackedScrollView,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import autobind from 'class-autobind';
import moment from 'moment';

import { Button } from './controls';
import { loadSchedule } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    backgroundColor: '#000000',
  },

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

  row: {
    height: 60,
    justifyContent: 'center',
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
    fontSize: 20,
    marginBottom: 10,
  },
  modalDescription: {
    marginBottom: 20,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      dataSource: this.defineSource(props),

      modalShown: false,
      modalData: null,
    };
  }

  // load
  componentWillMount() {
    this.props.loadSchedule();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.defineSource(nextProps),
    });
  }

  moment(date) { // eslint-disable-line
    return moment(date, 'MM/DD/YY hh:mm a');
  }

  defineSource({ sessions }) {
    const sections = _.sortBy(_.uniq(sessions.map(s => s.date)), d => this.moment(d).unix());

    const data = {};
    const sectionIds = [];
    const rowIds = [];

    _.forEach(sections, (section, i) => {
      sectionIds.push(section);

      rowIds[i] = [];
      data[section] = {};

      _.forEach(_.filter(sessions, s => s.date === section), (s) => {
        rowIds[i].push(s.id);
        data[section][s.id] = s;
      });
    });

    const ds = new ListView.DataSource({
      getSectionData: (blob, sectionId) => sectionId,
      getRowData: (blob, sectionId, rowId) => blob[sectionId][rowId],
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    return ds.cloneWithRowsAndSections(data, sectionIds, rowIds);
  }

  // press
  onPress(data) {
    this.setState({
      modalShown: true,
      modalData: data,
    });
  }

  // render
  renderSectionHeader(data, sectionId) {
    const m = this.moment(sectionId);
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{m.format('dddd, hh:mm a')}</Text>
      </View>
    );
  }

  renderRow(data) {
    return (
      <TouchableHighlight onPress={this.onPress.bind(this, data)}>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{data.title}</Text>
          <Text style={styles.rowPresenter}>{data.presenter}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderList() {
    return (
      <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />} // eslint-disable-line
      />
    );
  }

  renderModal() {
    const { modalData } = this.state;

    const close = () => {
      this.setState({
        modalShown: false,
        modalData: null,
      });
    };

    const renderContent = () => {
      if (!modalData) {
        return null;
      }

      return (
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{modalData.title}</Text>
          <Text style={styles.modalPresenter}>{modalData.presenter}</Text>
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

  render() {
    return (
      <View style={styles.container}>
        {this.renderModal()}
        {this.renderList()}
      </View>
    );
  }
}

App.propTypes = {
  sessions: PropTypes.array.isRequired,
  loadSchedule: PropTypes.func.isRequired,
};

export default connect(({ sessions }) => ({ sessions }), { loadSchedule })(App);
