import { Routes } from '@angular/router';

import { PacientesComponent } from './pacientes.component';
import {AgregarPacientesComponent} from './agregar-pacientes//agregar-pacientes.component';


export const PacientesRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'listar',
            component: PacientesComponent
        }]}, {
        path: '',
        children: [ {
            path: 'agregar',
            component: AgregarPacientesComponent
        }]
    }
];