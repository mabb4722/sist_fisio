import { Routes } from '@angular/router';

import {CategoriasComponent} from './categorias.component';

import {AgregarcategoriaComponent} from './agregarcategoria/agregarcategoria.component';



export const CategoriasRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'categorias_list',
            component: CategoriasComponent
        }]}, {
        path: '',
        children: [ {
            path: 'agregar_categoria',
            component: AgregarcategoriaComponent
        }]
    } 
];


