import { combineReducers } from 'redux';
import { IStoreState } from '@src/types/store';
import { page } from './page';
import { registerForm } from './registerForm';
import { loginForm } from './loginForm';
import { api } from './api';

export const rootReducers = combineReducers<IStoreState>({
  page,
  registerForm,
  loginForm,
  api,
});
