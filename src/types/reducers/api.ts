export interface IProfileData {
  email: string;
  expires_in: number;
  full_name: string;
  id: number;
  is_expired: boolean;
  role: string;
  status: string;
  type: string;
}

export type TProfileDataState = IProfileData | null;

export interface ITariffsDataItem {
  id: number;
  currency: string;
  amount: number;
  name: string;
  description: string;
  frequency: 'daily';
  interval: number;
  created_at: Date;
  updated_at: Date;
}

export type TTariffsDataState = ITariffsDataItem[] | null;

export interface IApiState {
  profile: TProfileDataState;
  tariffs: TTariffsDataState;
}
