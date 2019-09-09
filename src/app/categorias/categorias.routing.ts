import { Routes } from '@angular/router';

import {CategoriasComponent} from './categorias.component';

import {AgregarcategoriaComponent} from './agregarcategoria/agregarcategoria.component';

import {SubcategoriasComponent} from './subcategorias/subcategorias.component';


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
    }, {
        path: '',
        children: [ {
            path: 'subcategorias/:idCategoria',
            component: SubcategoriasComponent
        }]
    }, /*{
        path: '',
        children: [ {
            path: 'notifications',
            component: NotificationsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'panels',
            component: PanelsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'sweet-alert',
            component: SweetAlertComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'typography',
            component: TypographyComponent
        }]
    }*/
];


