import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
    state('void', style({ opacity: 0 })),
    transition(':enter', [animate('1s', style({ opacity: 1 }))]),
]);

export const slideInAnimation = trigger('slideInAnimation', [
    state('void', style({ transform: 'translateX(-100%)' })),
    transition(':enter', [animate('0.5s', style({ transform: 'translateX(0)' }))]),
]);
