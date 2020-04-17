import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStoreState } from '@src/types/store';
import { TTariffsDataState } from '@src/types/reducers/api';
import { setTariffsData } from '@actions/api';
import Plans, { IStateProps, IActionProps } from './Plans';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  tariffs: state.api.tariffs,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setTariffsData: (tariffs: TTariffsDataState) => dispatch(setTariffsData(tariffs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
