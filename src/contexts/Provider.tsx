import { useState } from 'react';
import { SupportedLocales } from '../localization/language';
import { LangContext } from './localization';

export default function Provider({ children }: { children: JSX.Element }) {
  const DEFAULT_LANGUAGE = 'en';
  const [lang, setLang] = useState<SupportedLocales>(
    (localStorage.getItem('lang') as SupportedLocales | undefined) || DEFAULT_LANGUAGE
  );
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
