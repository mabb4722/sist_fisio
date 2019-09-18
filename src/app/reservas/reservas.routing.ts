import { Routes } from '@angular/router';

import { ReservasComponent } from './reservas.component';
import { AddReservaComponent } from './add-reserva/add-reserva.component';

export const ReservasRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'list',
        component: ReservasComponent
    }]
},
{
    path: '',
    children: [ {
      path: 'add',
      component: AddReservaComponent
    }]
    }
];
