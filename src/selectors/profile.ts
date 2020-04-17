import { IStoreState } from '@src/types/store';

export const getFullName = (state: IStoreState): string => {
  if (state.api.profile) {
    return state.api.profile.full_name;
  }

  return '';
};

export const getEmail = (state: IStoreState): string => {
  if (state.api.profile) {
    return state.api.profile.email;
  }

  return '';
};

export const getAccountType = (state: IStoreState): string => {
  if (state.api.profile) {
    return state.api.profile.type;
  }

  return '';
};
