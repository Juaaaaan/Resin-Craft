import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal/scroll-reveal';

@Component({
  selector: 'app-brand-story',
  imports: [ScrollRevealDirective],
  templateUrl: './brand-story.html',
  styleUrl: './brand-story.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandStory {}
