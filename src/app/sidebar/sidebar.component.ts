import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/presentacion-producto',
        title: 'Presentación Productos',
        type: 'sub',
        icontype: 'event_note',
        collapse: 'presentacion-producto',
        children: [
            {path: 'agregar', title: 'Agregar', ab:'APP'},
            {path: 'listar', title: 'Listar', ab:'LPP'}
        ]
    },{
        path: '/pacientes',
        title: 'Pacientes',
        type: 'sub',
        icontype: 'event_note',
        collapse: 'pacientes',
        children: [
            {path: 'agregar', title: 'Agregar', ab:'AP'},
            {path: 'listar', title: 'Listar', ab:'LP'}
        ]
    },
    {
        path: '/reservas',
        title: 'Reservas',
        type: 'sub',
        icontype: 'event_note',
        collapse: 'reservas',
        children: [
            {path: 'list', title: 'Reservas', ab:'R'},
            {path: 'add', title: 'Crear Reserva', ab:'CR'}
        ]
    },
    {
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab: 'B'},
            {path: 'grid', title: 'Grid System', ab: 'GS'},
            {path: 'panels', title: 'Panels', ab: 'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA'},
            {path: 'notifications', title: 'Notifications', ab: 'N'},
            {path: 'icons', title: 'Icons', ab: 'I'},
            {path: 'typography', title: 'Typography', ab: 'T'}
        ]
    }, {
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'forms',
        children: [
            {path: 'regular', title: 'Regular Forms', ab: 'RF'},
            {path: 'extended', title: 'Extended Forms', ab: 'EF'},
            {path: 'validation', title: 'Validation Forms', ab: 'VF'},
            {path: 'wizard', title: 'Wizard', ab: 'W'}
        ]
    }, {
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'tables',
        children: [
            {path: 'regular', title: 'Regular Tables', ab: 'RT'},
            {path: 'extended', title: 'Extended Tables', ab: 'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab: 'DT'}
        ]
    }, {
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        children: [
            {path: 'google', title: 'Google Maps', ab: 'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM'},
            {path: 'vector', title: 'Vector Map', ab: 'VM'}
        ]
    }, {
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    }, {
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    }, {
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    }, {
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab: 'P'},
            {path: 'timeline', title: 'Timeline Page', ab: 'TP'},
            // {path: 'login', title: 'Login Page', ab: 'LP'},
            {path: 'register', title: 'Register Page', ab: 'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab: 'LSP'},
            {path: 'user', title: 'User Page', ab: 'UP'}
        ]
    },
    {
        path: '/categorias',
        title: 'Categorias',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'categorias',
        children: [
            {path: 'categorias_list', title: 'Categorías', ab: 'CAT'},
        ]
    },
    {
        path: '/sub_categorias',
        title: 'Sub-Categorias',
        type: 'sub',
        icontype: 'description',
        collapse: 'sub_categorias',
        children: [
            {path: 'sub_categorias_list', title: 'Sub-Categorias', ab: 'SCAT'},
        ]
    },
    {
        path: '/reportes',
        title: 'Reportes',
        type: 'sub',
        icontype: 'description',
        collapse: 'reportes',
        children: [
            {path: 'reporte_resumido', title: 'Reporte Resumido', ab: 'RS'},
            {path: 'reporte_extendido', title: 'Reporte Extendido', ab: 'RE'},
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    usuario = localStorage.getItem('usuario');
    loginExitoso = localStorage.getItem('loginExitoso');
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }
    constructor(private _router: Router){ }
    ngOnInit() {
        if(this.loginExitoso== 'false'){
            this._router.navigate(['pages/login']);
            swal({
                title: 'Error!',
                text: 'Para acceder al sistema loguearse primero!',
                type: 'error',
                confirmButtonClass: "btn btn-info",
                buttonsStyling: false
              })
        }else{
            this.menuItems = ROUTES.filter(menuItem => menuItem);
            if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
                const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
                this.ps = new PerfectScrollbar(elemSidebar);
            }
        }
        
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
