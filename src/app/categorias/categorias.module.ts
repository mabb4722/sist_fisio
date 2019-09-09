import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';


import {CategoriasRoutes} from './categorias.routing';
import {CategoriasComponent} from './categorias.component';
import {AgregarcategoriaComponent} from './agregarcategoria/agregarcategoria.component';
import {SubcategoriasComponent} from './subcategorias/subcategorias.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CategoriasRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [
        CategoriasComponent,
        AgregarcategoriaComponent,
        SubcategoriasComponent
    ],
    exports: [ CategoriasComponent ]
})

export class CategoriasModule {}
