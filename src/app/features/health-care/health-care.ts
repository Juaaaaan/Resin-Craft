import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { IntroPageSection } from '../../shared/components/intro-page-section/intro-page-section';
import { HealthCards } from './components/health-cards/health-cards';

@Component({
  selector: 'app-health-care',
  imports: [TranslocoDirective, IntroPageSection, HealthCards],
  templateUrl: './health-care.html',
  styleUrl: './health-care.scss',
})
export class HealthCare {}
