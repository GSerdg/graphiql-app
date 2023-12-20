import { createContext } from 'react';
import { SupportedLocales } from '../localization/language';

interface LangContext {
  lang: SupportedLocales;
  setLang: React.Dispatch<React.SetStateAction<SupportedLocales>>;
}

export const LangContext = createContext<LangContext>({} as LangContext);
