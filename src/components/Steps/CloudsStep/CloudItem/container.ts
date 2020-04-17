import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TClouds, TStep } from '@src/types/reducers/page';
import { setPageStep, setChoosedCloud } from '@actions/page';
import CloudItem, { IActionProps } from './CloudItem';

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  chooseCloud: (cloud: TClouds) => dispatch(setChoosedCloud(cloud)),
  setPageStep: (step: TStep) => dispatch(setPageStep(step)),
});

export default connect(null, mapDispatchToProps)(CloudItem);
