import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {AgregarcategoriaRoute} from './agregarcategoria.routing';
import {AgregarcategoriaComponent} from './agregarcategoria.component';
import {MaterialModule} from '../../app.module';





@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AgregarcategoriaRoute),
        FormsModule,
        MaterialModule
    ],
    declarations: [
        AgregarcategoriaComponent
    ],
    exports: [ AgregarcategoriaComponent ]
})

export class AgregarcategoriaModule {}
