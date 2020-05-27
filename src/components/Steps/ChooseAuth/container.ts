import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
import { IStoreState } from '@src/types/store';
// import { setPageStep } from '@src/actions/page';
// import { TStep } from '@src/types/reducers/page';
import Private from '@src/HOCs/Private';
import ChooseAuth, { IStateProps } from './ChooseAuth';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  choosedCloud: state.page.choosedCloud,
});

// const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
//   setPageStep: (step: TStep) => dispatch(setPageStep(step)),
// });

export default Private(connect(mapStateToProps)(ChooseAuth));
