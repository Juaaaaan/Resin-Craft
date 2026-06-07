import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { IntroPageSection } from '../../shared/components/intro-page-section/intro-page-section';

@Component({
  selector: 'app-health-care',
  imports: [TranslocoDirective, IntroPageSection],
  templateUrl: './health-care.html',
  styleUrl: './health-care.scss',
})
export class HealthCare {}
