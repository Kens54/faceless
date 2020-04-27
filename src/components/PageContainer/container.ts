import { connect } from 'react-redux';
import { IStoreState } from '@src/types/store';
import PageContainer, { IStateProps } from './PageContainer';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  step: state.page.step,
});

export default connect(mapStateToProps)(PageContainer);
