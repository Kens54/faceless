import { createContext } from 'react';

export type TToken = string | null;

export interface ITokenContext {
  token: TToken;
  setToken: (token: TToken) => void;
}

export const TokenContext = createContext<Partial<ITokenContext>>({ token: null, setToken: () => {} });
