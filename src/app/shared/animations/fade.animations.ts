import {
  trigger,
  transition,
  style,
  animate,
  state,
  query,
  group,
  animateChild,
  stagger
} from '@angular/animations';

export const alertFadeInOut = trigger('alertFadeInOut', [
  transition(
    ':enter',
    query('.alert-backdrop, .alert-content', [
      style({ opacity: 0 }),
      stagger(200, [animate('250ms ease-in', style({ opacity: 1 }))])
    ])
  ),
  transition(
    ':leave',
    query('.alert-backdrop, .alert-content', [
      style({ opacity: 1 }),
      stagger(-200, [animate('250ms ease-out', style({ opacity: 0 }))])
    ])
  )
]);
