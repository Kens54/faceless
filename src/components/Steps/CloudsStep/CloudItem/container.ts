import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TClouds } from '@src/types/reducers/page';
import { setChoosedCloud } from '@actions/page';
import CloudItem, { IActionProps } from './CloudItem';

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  chooseCloud: (cloud: TClouds) => dispatch(setChoosedCloud(cloud)),
});

export default connect(null, mapDispatchToProps)(CloudItem);
