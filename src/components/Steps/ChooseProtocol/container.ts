import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TStep, TSetupId } from '@src/types/reducers/page';
import { setPageStep, setSetupId } from '@actions/page';
import ChooseProtocol, { IActionProps } from './ChooseProtocol';

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setPageStep: (step: TStep) => dispatch(setPageStep(step)),
  setSetupId: (id: TSetupId) => dispatch(setSetupId(id)),
});

export default connect(null, mapDispatchToProps)(ChooseProtocol);
