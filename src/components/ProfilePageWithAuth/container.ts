import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStoreState } from '@src/types/store';
import { TProfilePageStep } from '@src/types/reducers/profilePage';
import { setProfilePageStep } from '@src/actions/profilePage';
import ProfilePageWithAuth, { IStateProps, IActionProps } from './ProfilePageWithAuth';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  step: state.profilePage.step,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setProfilePageStep: (step: TProfilePageStep) => dispatch(setProfilePageStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageWithAuth);
