import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { ReservasRoutes } from './reservas.routing';

import { ReservasComponent } from './reservas.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReservasRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      ReservasComponent
  ],
  exports: [ ReservasComponent ]
})

export class ReservasModule {}
