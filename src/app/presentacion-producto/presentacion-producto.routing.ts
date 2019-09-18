import { Routes } from '@angular/router';

import { PresentacionProductoComponent } from './presentacion-producto.component';
import { AgregarPresentacionProductoComponent } from './agregar-presentacion-producto/agregar-presentacion-producto.component';

export const PresentacionProductoRoutes: Routes = [
  {
    path: '',
    children: [ {
        path: 'listar',
        component: PresentacionProductoComponent
    }]}, {
    path: '',
    children: [ {
        path: 'agregar',
        component: AgregarPresentacionProductoComponent
    }]
}
];
