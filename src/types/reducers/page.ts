export type TClouds = 'aws' | 'aws1' | 'aws2';
export type TStep =
  | 'start'
  | 'login'
  | 'register'
  | 'chooseCloud'
  | 'chooseAuth'
  | 'chooseAuthError'
  | 'awsCredentials'
  | 'tariffs'
  | 'chooseProtocol'
  | 'expectInstallation'
  | 'done';
export type TChoosedCloud = TClouds | null;
export type TSetupId = number | null;
export type TServerType = 'faceless' | 'existing' | null;

export interface IPageState {
  step: TStep;
  choosedCloud: TChoosedCloud;
  setupId: TSetupId;
  serverType: TServerType;
}
