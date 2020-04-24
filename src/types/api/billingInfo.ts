export interface ISuccessBillingInfoRequest {
  code: number;
  payload: {
    card: {
      card_expiry_month: number;
      card_expiry_year: number;
      card_holder: string;
      card_number: string;
      currency: string;
    };
    subscriptions: [
      {
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
      },
    ];
  };
}
