import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { SubcategoriasRoutes } from './subcategorias.routing';
import { SubcategoriasComponent } from './subcategorias.component';






@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SubcategoriasRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [
        SubcategoriasComponent,
    ],
    exports: [ SubcategoriasComponent ]
})

export class SubCategoriasModule {}
