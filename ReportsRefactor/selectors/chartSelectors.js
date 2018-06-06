import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import moment from 'moment';
const reportSelector = (state, reportName) => {
  const report = state.reports.get(reportName);
  return report || Map();
};
const reportStateSelector = state => state.discover;

const loadingSelector = createSelector(
  reportSelector,
  (report) => (
    !report || report.size === 0 || !report.getIn(['data', 'report_data'])
  )
);

const reportDataSelector = createSelector(
  reportSelector,
  loadingSelector,
  ( report, loading ) => (
    !loading ? report.getIn(['data', 'report_data']) : Map()
  )
);

const byDateSelector = createSelector(
  reportDataSelector,
  ( reportData ) => {
    console.log(reportData)
    const byDateData = reportData.get('by_date');
    let allDates = List();
    if (!byDateData || byDateData.size === 0) { return allDates; }
    const firstDate = moment(byDateData.first().get('start_date'));
    const lastDate = moment(byDateData.last().get('start_date'));
    for (let m = firstDate; (m.isBefore(lastDate) || m.isSame(lastDate)); m.add(1, 'days')) {
      const record = byDateData.find(r => r.get('start_date') === m.format('YYYY-MM-DD'));
      if (record) {
        allDates = allDates.push(record);
      } else {
        allDates = allDates.push(Map({ start_date: m.format('YYYY-MM-DD') }));
      }
    }

    return allDates.sort((a, b) => {
      const c = new Date(a.get('start_date'));
      const d = new Date(b.get('start_date'));

      return c.getTime() - d.getTime();
    });
  }
);

export {
  reportSelector,
  reportStateSelector,
  reportDataSelector,
  byDateSelector,
  loadingSelector
};
