import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView, RecyclerViewBackedScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import autobind from 'class-autobind';

import { loadSchedule } from '../../actions';

import Header from './header';
import Row from './row';

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#000000',
  },
});

class List extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      dataSource: this.defineSource(props),
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

  defineSource({ sessions }) {
    const sections =
      _.sortBy(
        _.uniqBy(
          sessions.map(s => ({ id: s.date, moment: s.moment })),
        s => s.id),
      s => s.moment.unix());

    const data = {};
    const sectionIds = [];
    const rowIds = [];

    _.forEach(sections, (section, i) => {
      sectionIds.push(section.id);

      rowIds[i] = [];
      data[section.id] = { section };

      _.forEach(_.filter(sessions, s => s.date === section.id), (s) => {
        rowIds[i].push(s.id);
        data[section.id][s.id] = s;
      });
    });

    const ds = new ListView.DataSource({
      getSectionData: (blob, sectionId) => blob[sectionId],
      getRowData: (blob, sectionId, rowId) => blob[sectionId][rowId],
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    return ds.cloneWithRowsAndSections(data, sectionIds, rowIds);
  }

  // render
  renderHeader(data) {
    return <Header data={data.section} />;
  }

  renderRow(data) {
    return <Row data={data} />;
  }

  renderScrollComponent(props) {
    return <RecyclerViewBackedScrollView {...props} />;
  }

  render() {
    if (Platform.OS === 'android') {
      return (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderSectionHeader={this.renderHeader}
          renderRow={this.renderRow}
        />
      );
    }

    return (
      <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderSectionHeader={this.renderHeader}
        renderRow={this.renderRow}
        renderScrollComponent={this.renderScrollComponent}
      />
    );
  }
}

List.propTypes = {
  sessions: PropTypes.array.isRequired,
  loadSchedule: PropTypes.func.isRequired,
};

export default connect(({ sessions }) => ({ sessions }), { loadSchedule })(List);
