import { TranslocoTestingOptions } from '@jsverse/transloco';
import en from '../../../../../public/i18n/en.json';
import es from '../../../../../public/i18n/es.json';

export const TRANSLOCO_CONST_CONFIG: TranslocoTestingOptions = {
  langs: { en, es },
  translocoConfig: {
    availableLangs: ['en', 'es'],
    defaultLang: 'en',
  },
  preloadLangs: true,
};
