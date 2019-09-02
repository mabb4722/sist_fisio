import { Routes } from '@angular/router';

import { ReservasComponent } from './reservas.component';

export const ReservasRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: '',
        component: ReservasComponent
    }]
}
];
