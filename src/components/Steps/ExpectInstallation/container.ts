import { connect } from 'react-redux';
import { IStoreState } from '@src/types/store';
import ExpectInstallation, { IStateProps } from './ExpectInstallation';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  setupId: state.page.setupId,
});


export default connect(mapStateToProps)(ExpectInstallation);
