import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';


import {CategoriasRoutes} from './categorias.routing';
import {CategoriasComponent} from './categorias.component';
import {AgregarcategoriaComponent} from './agregarcategoria/agregarcategoria.component';



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
    ],
    exports: [ CategoriasComponent ]
})

export class CategoriasModule {}
