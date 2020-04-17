export type TClouds = 'aws' | 'aws1' | 'aws2';
export type TStep =
  | 'start'
  | 'clouds'
  | 'chooseAuth'
  | 'login'
  | 'register'
  | 'buy'
  | 'plans'
  | 'chooseProtocol'
  | 'expect-installation'
  | 'done';
export type TChoosedCloud = TClouds | null;
export type TSetupId = number | null;

export interface IPageState {
  step: TStep;
  choosedCloud: TChoosedCloud;
  setupId: TSetupId;
}
