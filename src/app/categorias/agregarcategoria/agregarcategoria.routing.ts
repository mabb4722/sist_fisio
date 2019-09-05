import { Routes } from '@angular/router';

import {AgregarcategoriaComponent} from './agregarcategoria.component';

export const AgregarcategoriaRoute: Routes = [
    {
        path: '',
        children: [ {
            path: '',
            component: AgregarcategoriaComponent
        }]
    }
];
