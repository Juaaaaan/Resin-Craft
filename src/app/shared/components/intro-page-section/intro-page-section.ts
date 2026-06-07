import { Component, input } from '@angular/core';

@Component({
  selector: 'app-intro-page-section',
  imports: [],
  templateUrl: './intro-page-section.html',
  styleUrl: './intro-page-section.scss',
})
export class IntroPageSection {
  title = input<string>();
  description = input<string>();
  season = input<string>();
}
