import { inject, Injectable, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

const SUPPORTED_LANGS = ['en', 'es'] as const;
type SupportedLang = (typeof SUPPORTED_LANGS)[number];
const FALLBACK_LANG: SupportedLang = 'en';

function extractLang(raw: string): SupportedLang {
  const code = raw.split('-')[0].toLowerCase();
  return (SUPPORTED_LANGS as readonly string[]).includes(code)
    ? (code as SupportedLang)
    : FALLBACK_LANG;
}

@Injectable({ providedIn: 'root' })
export class LangDetectorService {
  private transloco = inject(TranslocoService);
  private platformId = inject(PLATFORM_ID);
  private request = inject(REQUEST, { optional: true });

  detect(): void {
    const lang = isPlatformBrowser(this.platformId)
      ? this.fromBrowser()
      : this.fromRequest();

    this.transloco.setActiveLang(lang);
  }

  private fromBrowser(): SupportedLang {
    const preferred = navigator.languages?.[0] ?? navigator.language ?? '';
    return extractLang(preferred);
  }

  private fromRequest(): SupportedLang {
    const header = this.request?.headers.get('accept-language') ?? '';
    // Accept-Language: es-419,es;q=0.9,en;q=0.8 — take the first entry
    const first = header.split(',')[0]?.trim() ?? '';
    return extractLang(first);
  }
}
