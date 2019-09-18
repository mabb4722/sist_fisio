import { Routes } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { ReporteextendComponent } from './reporteextend/reporteextend.component';


export const ReporteRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'reporte_resumido',
            component: ReporteComponent
        }]},
        {
            path: '',
            children: [ {
                path: 'reporte_extendido',
                component: ReporteextendComponent
            }]}
];


