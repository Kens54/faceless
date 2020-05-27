import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStoreState } from '@src/types/store';
import { IProfileData, TCardState, TSubscriptionsState } from '@src/types/reducers/api';
import { setProfileData, setCardData, setSubscriptionsData } from '@src/actions/api';
import { getFullName, getEmail, getAccountType } from '@selectors/profile';
import { TProfilePageStep } from '@src/types/reducers/profilePage';
import { setProfilePageStep } from '@src/actions/profilePage';
import ProfilePage, { IStateProps, IActionProps } from './ProfilePage';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  fullName: getFullName(state),
  email: getEmail(state),
  accountStatus: getAccountType(state),
  card: state.api.card,
  subscriptions: state.api.subscriptions,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setProfileData: (data: IProfileData) => dispatch(setProfileData(data)),
  setCardData: (card: TCardState) => dispatch(setCardData(card)),
  setSubscriptionsData: (subscriptions: TSubscriptionsState) => dispatch(setSubscriptionsData(subscriptions)),
  setProfilePageStep: (step: TProfilePageStep) => dispatch(setProfilePageStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
