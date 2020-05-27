import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setServerType, setSetupId } from '@src/actions/page';
import { TServerType } from '@src/types/reducers/page';
import StartStep, { IActionProps } from './StartStep';

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setServerType: (serverType: TServerType) => dispatch(setServerType(serverType)),
  setSetupId: (setupId: number) => dispatch(setSetupId(setupId)),
});

export default connect(null, mapDispatchToProps)(StartStep);
