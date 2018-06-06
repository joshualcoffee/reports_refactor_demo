import { connect } from 'react-redux';
import * as selectors from '../selectors/chartSelectors';
export default (reportName) => {
  const mapStateToprops = state => ({
    reportState: selectors.reportStateSelector(state, reportName),
    reportData: selectors.reportDataSelector(state, reportName),
    report: selectors.reportSelector(state, reportName),
    byDate: selectors.byDateSelector(state, reportName),
    isLoading: selectors.loadingSelector(state, reportName)
  });
  return connect(mapStateToprops, null);
};
