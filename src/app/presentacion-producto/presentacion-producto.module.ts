import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PresentacionProductoComponent } from './presentacion-producto.component';
import { PresentacionProductoRoutes } from './presentacion-producto.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PresentacionProductoRoutes),
        FormsModule
    ],
    declarations: [PresentacionProductoComponent]
})

export class PresentacionProductoModule {}