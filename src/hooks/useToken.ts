import { useLocalStorage } from '@hooks/useLocalStorage';

export const useToken = () => {
  const [token, setToken] = useLocalStorage('token', null);

  return [token, setToken];
};
