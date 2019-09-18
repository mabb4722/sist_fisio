import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtencionComponent } from './Horario/atencion/atencion.component';
import { ExcepcionComponent } from './Horario/excepcion/excepcion.component';
import { FisioterapuetaRoutes } from './fisioterapeuta.routing';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../app.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { FiltrarHorarioAtencionComponent } from './forms/filtrar-horario-atencion/filtrar-horario-atencion.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AgregarHorarioAtencionComponent } from './forms/agregar-horario-atencion/agregar-horario-atencion.component';
import { FiltrarHorarioExcepcionComponent } from './forms/filtrar-horario-excepcion/filtrar-horario-excepcion.component';
import { AgregarHorarioExcepcionComponent } from './forms/agregar-horario-excepcion/agregar-horario-excepcion.component';

@NgModule({
  declarations: [
    AtencionComponent,
    ExcepcionComponent,
    FiltrarHorarioAtencionComponent,
    AgregarHorarioAtencionComponent,
    FiltrarHorarioExcepcionComponent,
    AgregarHorarioExcepcionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FisioterapuetaRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    
    
  ]
})
export class FisioterapeutaModule { }
