import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IStoreState } from "@src/types/store";
import { TStep } from "@src/types/reducers/page";
import { setPageStep } from "@src/actions/page";
import ChooseAuth, { IStateProps, IActionProps } from "./ChooseAuth";

const mapStateToProps = (state: IStoreState): IStateProps => ({
  choosedCloud: state.page.choosedCloud
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  setPageStep: (step: TStep) => dispatch(setPageStep(step))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseAuth);
