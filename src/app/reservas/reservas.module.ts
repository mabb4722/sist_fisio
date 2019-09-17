import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { ReservasRoutes } from './reservas.routing';

import { ReservasComponent } from './reservas.component';
import { AddReservaComponent } from './add-reserva/add-reserva.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReservasRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      ReservasComponent,
      AddReservaComponent
  ],
  exports: [ ReservasComponent ]
})

export class ReservasModule {}
