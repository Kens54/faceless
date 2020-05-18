import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
import { IStoreState } from '@src/types/store';
// import { setPageStep } from '@src/actions/page';
// import { TStep } from '@src/types/reducers/page';
import ExpectInstallation, { IStateProps } from './ExpectInstallation';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  setupId: state.page.setupId,
});

// const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  // setPageStep: (step: TStep) => dispatch(setPageStep(step)),
// });

export default connect(mapStateToProps)(ExpectInstallation);
