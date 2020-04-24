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

export interface ICard {
  card_expiry_month: number;
  card_expiry_year: number;
  card_holder: string;
  card_number: string;
  currency: string;
}

export type TCardState = ICard | null;

export interface ISubscription {
  created_at: Date;
  expired_at: Date;
  is_active: true;
  started_at: Date;
  tariff: {
    amount: number;
    created_at: Date;
    currency: 'CNY';
    description: string;
    frequency: 'daily';
    id: number;
    interval: number;
    name: string;
    updated_at: Date;
  };
  updated_at: Date;
}

export type TSubscriptionsState = ISubscription[] | null;

export interface IApiState {
  profile: TProfileDataState;
  tariffs: TTariffsDataState;
  card: TCardState;
  subscriptions: TSubscriptionsState;
}
