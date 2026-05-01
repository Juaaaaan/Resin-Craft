import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

@Injectable({ providedIn: 'root' })
export class TranslocoSsrLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    const filePath = join(process.cwd(), 'public', 'i18n', `${lang}.json`);
    const data = readFileSync(filePath, 'utf-8');
    return Promise.resolve(JSON.parse(data) as Translation);
  }
}
