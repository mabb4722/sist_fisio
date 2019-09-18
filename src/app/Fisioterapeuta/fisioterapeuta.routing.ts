import { Routes } from '@angular/router';
import { AtencionComponent } from './Horario/atencion/atencion.component';
import { ExcepcionComponent } from './Horario/excepcion/excepcion.component';


export const FisioterapuetaRoutes: Routes = [
    {

      path: '',
      children: [
      {
        path: 'atencion',
        component: AtencionComponent
      },
      {
        path: 'excepcion',
        component: ExcepcionComponent

      }
  ]
}
];
