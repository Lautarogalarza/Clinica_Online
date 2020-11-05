
import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Login => Register', [
      query(':enter', [
        style({ opacity: 0, position: 'absolute', left: '0vw', top: '-100vh' }), //afecta Registro
      ]),
      query(':leave', [
        style({ opacity: 1, position: 'absolute', left: '0vw', top: '13vh' }), //afecta Login
      ]),
      group([
        query(':enter', [
          animate('1500ms', style({ opacity: 1, position: 'absolute', left: '0vw', top: '0vh' })) //afecta Registro
        ]),
        query(':leave', [
          animate('1500ms', style({ opacity: 0, position: 'absolute', left: '0vw', top: '113vh' })) //afecta Login
        ]),
      ]),
      query(':enter', animateChild()),
      query(':leave', animateChild()),
    ]),




    transition('Register => Login', [
      query(':enter', [
        style({ opacity: 0, position: 'absolute', left: '-50vw', top: '5vh' }), //afecta Login
      ]),
      query(':leave', [
        style({ opacity: 1, position: 'absolute', left: '25vw', top: '5vh' }), //afecta Registro
      ]),

      group([
        query(':enter', [
          animate('1500ms', style({ opacity: 1, position: 'absolute', left: '25vw', top: '5vh' })) //afecta Login
        ]),
        query(':leave', [
          animate('1500ms', style({ opacity: 0, position: 'absolute', left: '100vw', top: '5vh' })) //afecta registro
        ]),
      ]),
      query(':enter', animateChild()),
      query(':leave', animateChild()),
    ]),




    transition('Login => Paciente', [
      query(':enter', [
        style({ opacity: 0, position: 'absolute', left: '0vw', top: '100vh' }), //afecta Registro
      ]),
      query(':leave', [
        style({ opacity: 1, position: 'absolute', left: '0vw', top: '13vh' }), //afecta Login
      ]),

      group([
        query(':enter', [
          animate('1500ms', style({ opacity: 1, position: 'absolute', left: '0vw', top: '0vh' })) //afecta Registro
        ]),
        query(':leave', [
          animate('1500ms', style({ opacity: 0, position: 'absolute', left: '0vw', top: '113vh' })) //afecta Login
        ]),
      ]),
      query(':enter', animateChild()),
      query(':leave', animateChild()),
    ]),


    transition('Paciente => Login', [
      query(':leave', [
        style({ opacity: 1, position: 'absolute', left: '0vw', top: '13vh' }), //afecta Login
      ]),
      query(':enter', [
        style({ opacity: 0, position: 'absolute', left: '0vw', top: '100vh' }), //afecta Registro
      ]),

      group([
        query(':leave', [
          animate('1500ms', style({ opacity: 0, position: 'absolute', left: '0vw', top: '113vh' })) //afecta Login
        ]),
        query(':enter', [
          animate('1500ms', style({ opacity: 1, position: 'absolute', left: '0vw', top: '0vh' })) //afecta Registro
        ]),
      ]),
      query(':enter', animateChild()),
      query(':leave', animateChild()),
    ])


  ]); 