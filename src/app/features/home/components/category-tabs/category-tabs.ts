import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CategoryTab } from '../../models/category.model';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal/scroll-reveal';

@Component({
  selector: 'app-category-tabs',
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './category-tabs.html',
  styleUrl: './category-tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTabs {
  readonly tabs: CategoryTab[] = [
    { label: 'PENDIENTES', slug: 'pendientes' },
    { label: 'COLGANTES', slug: 'colgantes' },
    { label: 'PULSERAS', slug: 'pulseras' },
    { label: 'ANILLOS', slug: 'anillos' },
    { label: 'LLAVEROS', slug: 'llaveros' },
  ];

  activeTab = signal('pendientes');

  setActive(slug: string): void {
    this.activeTab.set(slug);
  }
}
