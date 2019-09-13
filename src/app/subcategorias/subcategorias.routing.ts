import { Routes } from '@angular/router';
import { SubcategoriasComponent } from './subcategorias.component';





export const SubcategoriasRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'sub_categorias_list',
            component: SubcategoriasComponent
         }]}, //{
    //     path: '',
    //     children: [ {
    //         path: 'agregar_categoria',
    //         component: AgregarcategoriaComponent
    //     }]
    // } 
];


