import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/ui/button/button';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-hero-collections',
  imports: [ButtonComponent, TranslocoDirective],
  templateUrl: './hero-collections.html',
  styleUrl: './hero-collections.scss',
})
export class HeroCollections {}
