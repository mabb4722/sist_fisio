  
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { PacientesRoutes } from './pacientes.routing';

import { PacientesComponent } from './pacientes.component';
import { AgregarPacientesComponent } from './agregar-pacientes/agregar-pacientes.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PacientesRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      PacientesComponent,
      AgregarPacientesComponent
  ],
  exports: [ PacientesComponent ]
})

export class PacientesModule {}