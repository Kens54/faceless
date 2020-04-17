import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TStep } from '@src/types/reducers/page';
import { TProfileDataState } from '@src/types/reducers/api';
import { setPageStep } from '@actions/page';
import { setProfileData } from '@actions/api';
import StartStep from './StartStep';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPageStep: (step: TStep) => dispatch(setPageStep(step)),
  setProfileData: (value: TProfileDataState) => dispatch(setProfileData(value)),
});

export default connect(null, mapDispatchToProps)(StartStep);
