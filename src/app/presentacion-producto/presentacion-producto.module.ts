import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { PresentacionProductoComponent } from './presentacion-producto.component';
import { PresentacionProductoRoutes } from './presentacion-producto.routing';
import { AgregarPresentacionProductoComponent } from './agregar-presentacion-producto/agregar-presentacion-producto.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PresentacionProductoRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [PresentacionProductoComponent, AgregarPresentacionProductoComponent]
})

export class PresentacionProductoModule {}