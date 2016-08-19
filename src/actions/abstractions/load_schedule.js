import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import moment from 'moment';

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
        const dayMap = {
          Thursday: '08/18/16',
          Friday: '08/19/16',
          Saturday: '08/20/16',
        };

        const sessions = [];
        $('.Day-detail').each((i, dayDetail) => {
          const dayTag = $(dayDetail);

          dayTag.find('.stage-details').each((j, stageDetail) => {
            const stageTag = $(stageDetail);

            stageTag.find('.session-detail').each((k, sessionDetail) => {
              const sessionTag = $(sessionDetail);
              const range = sessionTag.find('dt').text().split(',')[0].split(' - ');
              const day = dayTag.find('.day-name').text();
              const date = `${dayMap[day]} ${range[0]}`;

              sessions.push({
                id: sessionTag.attr('id'),
                stage: stageTag.find('.stage-name').text(),
                title: sessionTag.find('h3').text(),
                presenter: sessionTag.find('h4').text(),
                description: sessionTag.find('p').text(),
                day,
                date,
                start: range[0],
                end: range[1],
                moment: moment(date, 'MM/DD/YY hh:mm a'),
              });
            });
          });
        });

        return sessions;
      }],
    }).then((response) => {
      dispatch({ type: LOAD_SCHEDULE_SUCCESS, payload: response });
    }).catch((err) => {
      dispatch({ type: LOAD_SCHEDULE_FAILURE });
      logError(err);
    });
  };
