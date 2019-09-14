import { Routes } from '@angular/router';

import { PresentacionProductoComponent } from './presentacion-producto.component';

export const PresentacionProductoRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: PresentacionProductoComponent
    }]
}
];
