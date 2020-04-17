import { ISetStepAction, ISetChoosedCloud, ISetSetupId } from '@src/types/actions/page';
import { PageActionTypes } from '@constants/page';
import { TStep, TChoosedCloud, TSetupId } from '@src/types/reducers/page';

export const setPageStep = (value: TStep): ISetStepAction => ({
  type: PageActionTypes.SET_STEP,
  payload: value,
});

export const setChoosedCloud = (value: TChoosedCloud): ISetChoosedCloud => ({
  type: PageActionTypes.SET_CHOOSED_CLOUD,
  payload: value,
});

export const setSetupId = (value: TSetupId): ISetSetupId => ({
  type: PageActionTypes.SET_SETUP_ID,
  payload: value,
});
