import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';

export type UseCookieReturn = [
  string | undefined,
  (newValue: string, options?: Cookies.CookieAttributes) => void,
  () => void,
];

export function useCookie(name: string, defaultValue?: string): UseCookieReturn {
  const [value, setValue] = useState<UseCookieReturn[0]>(() => {
    const cookie = Cookies.get(name);
    if (cookie) {
      return cookie;
    }
    if (defaultValue) {
      Cookies.set(name, defaultValue);
    }
    return defaultValue;
  });

  const updateCookie: UseCookieReturn[1] = useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(name, newValue, options);
      setValue(newValue);
    },
    [name, setValue]
  );

  const deleteCookie: UseCookieReturn[2] = useCallback(() => {
    Cookies.remove(name);
    setValue(undefined);
  }, [name, setValue]);

  return [value, updateCookie, deleteCookie];
}
