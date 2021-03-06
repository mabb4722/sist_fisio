import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'pages/login',
      pathMatch: 'full',
    }, 
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
            path: 'reservas',
            loadChildren: './reservas/reservas.module#ReservasModule'
        },{
            path: 'presentacion-producto',
            loadChildren: './presentacion-producto/presentacion-producto.module#PresentacionProductoModule'
    },{
        path: 'pacientes',
        loadChildren: './pacientes/pacientes.module#PacientesModule'
    },{
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
     },{
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
    }, {
        path: 'forms',
        loadChildren: './forms/forms.module#Forms'
    }, {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
    }, {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule'
    }, {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
    }, {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule'
    }, {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    }, {
        path: '',
        loadChildren: './userpage/user.module#UserModule'
    }, {
        path: '',
        loadChildren: './timeline/timeline.module#TimelineModule'
    }, 
    {
          path: 'categorias',
          loadChildren: './categorias/categorias.module#CategoriasModule'
      },
      {
        path: 'sub_categorias',
        loadChildren: './subcategorias/subcategorias.module#SubCategoriasModule'
    },
    {
        path: 'reportes',
        loadChildren: './reporte/reporte.module#ReporteModule'
    },
    {
        path: 'fisioterapeuta',
        loadChildren: './Fisioterapeuta/fisioterapeuta.module#FisioterapeutaModule'
    }

  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];