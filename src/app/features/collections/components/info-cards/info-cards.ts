import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardsCollections } from '../../consts/card-collections.const';
import { Cards } from '../../models/cards.model';

@Component({
  selector: 'app-info-cards',
  imports: [TranslocoDirective],
  templateUrl: './info-cards.html',
  styleUrl: './info-cards.scss',
})
export class InfoCards {
  cards: Cards[] = CardsCollections;
}
