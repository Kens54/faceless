import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TSetupId } from '@src/types/reducers/page';
import { setSetupId } from '@actions/page';
import ChooseProtocol, { IActionProps } from './ChooseProtocol';

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setSetupId: (id: TSetupId) => dispatch(setSetupId(id)),
  // setPageStep: (step: TStep) => dispatch(setPageStep(step)),
});

export default connect(null, mapDispatchToProps)(ChooseProtocol);
