import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';
import { FooterComponent } from '../footer/footer';
import { CartDrawerComponent } from '../../cart-drawer/cart-drawer';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CartDrawerComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly cartOpen = signal(false);

  toggleCart(): void {
    this.cartOpen.update((open) => !open);
  }

  onCheckout(): void {
    this.cartOpen.set(false);
  }
}
