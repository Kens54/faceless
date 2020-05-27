import { ISetStepAction, ISetChoosedCloud, ISetSetupId, ISetServerType } from '@src/types/actions/page';
import { PageActionTypes } from '@constants/page';
import { TStep, TChoosedCloud, TSetupId, TServerType } from '@src/types/reducers/page';

export const setPageStep = (value: TStep): ISetStepAction => {
  return {
    type: PageActionTypes.SET_STEP,
    payload: value,
  };
};

export const setChoosedCloud = (value: TChoosedCloud): ISetChoosedCloud => ({
  type: PageActionTypes.SET_CHOOSED_CLOUD,
  payload: value,
});

export const setSetupId = (value: TSetupId): ISetSetupId => ({
  type: PageActionTypes.SET_SETUP_ID,
  payload: value,
});

export const setServerType = (value: TServerType): ISetServerType => ({
  type: PageActionTypes.SET_SERVER_TYPE,
  payload: value,
});
