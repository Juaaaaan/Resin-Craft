import { animate, style, transition, trigger } from '@angular/animations';

export const slideDrawer = trigger('slideDrawer', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('300ms ease-in-out', style({ transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    animate('300ms ease-in-out', style({ transform: 'translateX(100%)' })),
  ]),
]);
