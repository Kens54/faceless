import { PageActionTypes } from '@constants/page';
import { TStep, TChoosedCloud, TSetupId, TServerType } from '@src/types/reducers/page';

export type TPageActions = ISetStepAction | ISetChoosedCloud | ISetSetupId | ISetServerType;

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

export interface ISetServerType {
  type: PageActionTypes.SET_SERVER_TYPE;
  payload: TServerType;
}
