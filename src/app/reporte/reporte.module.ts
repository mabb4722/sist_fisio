import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { ReporteRoutes } from './reporte.routing';
import { ReporteComponent } from './reporte.component';
import { ReporteextendComponent } from './reporteextend/reporteextend.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ReporteRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [
        ReporteComponent,
        ReporteextendComponent,
       
    ],
    exports: [ ReporteComponent ]
})

export class ReporteModule {}
