import { createContext, useContext, useState } from 'react';
import { localizedStrings } from '../localization/translations';

interface LangContext {
  lang: SupportedLocales;
  setLang: React.Dispatch<React.SetStateAction<SupportedLocales>>;
}

export type LangField = keyof typeof localizedStrings;
export type SupportedLocales = 'ru' | 'en';

export function useLocalizer() {
  const { lang } = useContext(LangContext);

  return (field: LangField) => {
    try {
      if (localizedStrings[field]) {
        return localizedStrings[field][lang];
      } else {
        throw new Error('Language key not found in object');
      }
    } catch (error) {
      console.error(error);
      return localizedStrings.unknown[lang];
    }
  };
}

export function useLangContext() {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLangContext must be used within a LangProvider');
  }
  return context;
}

export const LangContext = createContext<LangContext>({} as LangContext);

export function LangProvider({ children }: { children: JSX.Element }) {
  const DEFAULT_LANGUAGE = 'en';
  const [lang, setLang] = useState<SupportedLocales>(
    (localStorage.getItem('lang') as SupportedLocales | undefined) || DEFAULT_LANGUAGE
  );
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
