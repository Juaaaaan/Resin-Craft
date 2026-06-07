import { Component } from '@angular/core';
import { HeroCollections } from './components/hero-collections/hero-collections';
import { TranslocoDirective } from '@jsverse/transloco';
import { InfoCards } from './components/info-cards/info-cards';
import { IntroPageSection } from '../../shared/components/intro-page-section/intro-page-section';

@Component({
  selector: 'app-collections',
  imports: [HeroCollections, InfoCards, IntroPageSection, TranslocoDirective],
  templateUrl: './collections.html',
  styleUrl: './collections.scss',
})
export class Collections {}
