import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TStep } from '@src/types/reducers/page';
import { setPageStep } from '@src/actions/page';
import Private, { IActionProps } from './Private';

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setPageStep: (step: TStep) => dispatch(setPageStep(step)),
});

export default connect(null, mapDispatchToProps)(Private);
