import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TSetupId } from '@src/types/reducers/page';
import { setSetupId } from '@actions/page';
import Private from '@src/HOCs/Private';
import ChooseProtocol, { IActionProps } from './ChooseProtocol';

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setSetupId: (id: TSetupId) => dispatch(setSetupId(id)),
});

export default Private(connect(null, mapDispatchToProps)(ChooseProtocol));
