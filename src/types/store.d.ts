import { IPageState } from '@src/types/reducers/page';
import { IRegisterFormState } from '@src/types/reducers/registerForm';
import { ILoginFormState } from '@src/types/reducers/loginForm';
import { IApiState } from '@src/types/reducers/api';
import { IProfilePageState } from '@src/types/reducers/profilePage';

interface IStoreState {
  page: IPageState;
  registerForm: IRegisterFormState;
  loginForm: ILoginFormState;
  api: IApiState;
  profilePage: IProfilePageState;
}
