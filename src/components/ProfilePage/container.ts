import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStoreState } from '@src/types/store';
import { IProfileData } from '@src/types/reducers/api';
import { setProfileData } from '@src/actions/api';
import { getFullName, getEmail, getAccountType } from '@selectors/profile';
import ProfilePage, { IStateProps, IActionProps } from './ProfilePage';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  fullName: getFullName(state),
  email: getEmail(state),
  accountStatus: getAccountType(state),
  profile: state.api.profile,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setProfileData: (data: IProfileData) => dispatch(setProfileData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
