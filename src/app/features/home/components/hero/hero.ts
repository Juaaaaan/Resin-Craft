import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/ui/button/button';

@Component({
  selector: 'app-hero',
  imports: [ButtonComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  shopCollections = output();
  ourStory = output();
}
