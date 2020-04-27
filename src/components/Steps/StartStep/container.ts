import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setPageStep } from '@src/actions/page';
import { TStep } from '@src/types/reducers/page';
import StartStep, { IActionProps } from './StartStep';

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setPageStep: (step: TStep) => dispatch(setPageStep(step)),
});

export default connect(null, mapDispatchToProps)(StartStep);
