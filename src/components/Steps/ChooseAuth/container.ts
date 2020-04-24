import { connect } from 'react-redux';
import { IStoreState } from '@src/types/store';
import ChooseAuth, { IStateProps } from './ChooseAuth';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  choosedCloud: state.page.choosedCloud,
});

export default connect(mapStateToProps)(ChooseAuth);
