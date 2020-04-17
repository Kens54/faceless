import { PageActionTypes } from '@constants/page';
import { TStep, TChoosedCloud, TSetupId } from '@src/types/reducers/page';

export type TPageActions = ISetStepAction | ISetChoosedCloud | ISetSetupId;

export interface ISetStepAction {
  type: PageActionTypes.SET_STEP;
  payload: TStep;
}

export interface ISetChoosedCloud {
  type: PageActionTypes.SET_CHOOSED_CLOUD;
  payload: TChoosedCloud;
}

export interface ISetSetupId {
  type: PageActionTypes.SET_SETUP_ID;
  payload: TSetupId;
}
