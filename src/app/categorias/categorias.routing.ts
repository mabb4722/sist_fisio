import { Routes } from '@angular/router';

import {CategoriasComponent} from './categorias.component';

export const CategoriasRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: '',
            component: CategoriasComponent
        }]
    }
];
