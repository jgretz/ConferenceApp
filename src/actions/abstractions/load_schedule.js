import _ from 'lodash';
import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import { logError } from '../../support';

export const LOAD_SCHEDULE_SUCCESS = 'LOAD_SCHEDULE_SUCCESS';
export const LOAD_SCHEDULE_FAILURE = 'LOAD_SCHEDULE_FAILURE';

export const loadSchedule = () =>
  (dispatch) => {
    axios({
      method: 'get',
      url: 'http://abstractions.io/schedule/detail.html',

      transformResponse: [(data) => {
        const $ = cheerio.load(data);

        const schedule = [];
        $('.Day-detail').each((i, dayDetail) => {
          const dayTag = $(dayDetail);

          const sessions = [];
          dayTag.find('.stage-details').each((j, stageDetail) => {
            const stageTag = $(stageDetail);

            stageTag.find('.session-detail').each((k, sessionDetail) => {
              const sessionTag = $(sessionDetail);
              const range = sessionTag.find('dt').text().split(',')[0].split(' - ');

              sessions.push({
                stage: stageTag.find('.stage-name').text(),
                title: sessionTag.find('h3').text(),
                presenter: sessionTag.find('h4').text(),
                description: sessionTag.find('p').text(),
                start: range[0],
                end: range[1],
              });
            });
          });

          schedule.push({
            name: dayTag.find('.day-name').text(),
            sessions,
          });
        });

        return schedule;
      }],
    }).then((response) => {
      dispatch({ type: LOAD_SCHEDULE_SUCCESS, payload: response });
    }).catch((err) => {
      dispatch({ type: LOAD_SCHEDULE_FAILURE });
      logError(err);
    });
  };
