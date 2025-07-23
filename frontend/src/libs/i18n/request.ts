import { getRequestConfig } from 'next-intl/server';
import type { Language } from './config';
import { getCurrentLanguage } from './language';

export default getRequestConfig(async () => {
  const language = await getCurrentLanguage();

  return {
    locale: language as Language,
    messages: (await import(`../../../public/languages/${language}.json`))
      .default,
  };
});
