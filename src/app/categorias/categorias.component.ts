// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import {Component, OnInit, AfterViewInit,   AfterViewChecked} from '@angular/core';
import {DataApiService} from '../services/data-api.service';
import {Router} from '@angular/router';


declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.css']
})

export class CategoriasComponent implements OnInit, AfterViewInit, AfterViewChecked {
    public dataTable: DataTable;
    constructor(private dataApi: DataApiService, private _router: Router) { }
    categorias: any;
    bandera: boolean;
    eliminarID: any;
    editarID: any;
    ngOnInit() {
        this.getListCategorias();
        this.bandera = false;


    }

    ngAfterViewInit() {

    }
    ngAfterViewChecked()  {
        if (this.categorias && !this.bandera ) {
            this.bandera = true;
            $('#datatables').DataTable({
                'pagingType': 'full_numbers',
                'lengthMenu': [
                    [10, 25, 50, -1],
                    [10, 25, 50, 'All']
                ],
                responsive: true,
                language: {
                    'sProcessing':     'Procesando...',
                    'sLengthMenu':     'Mostrar _MENU_ registros',
                    'sZeroRecords':    'No se encontraron resultados',
                    'sEmptyTable':     'Ningún dato disponible en esta tabla',
                    'sInfo':           'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
                    'sInfoEmpty':      'Mostrando registros del 0 al 0 de un total de 0 registros',
                    'sInfoFiltered':   '(filtrado de un total de _MAX_ registros)',
                    'sInfoPostFix':    '',
                    'sSearch':         'Buscar:',
                    'sUrl':            '',
                    'sInfoThousands':  ',',
                    'sLoadingRecords': 'Cargando...',
                    'oPaginate': {
                        'sFirst':    'Primero',
                        'sLast':     'Último',
                        'sNext':     'Siguiente',
                        'sPrevious': 'Anterior'
                    },
                    'oAria': {
                        'sSortAscending':  ': Activar para ordenar la columna de manera ascendente',
                        'sSortDescending': ': Activar para ordenar la columna de manera descendente'
                    }
                }

            });

            $('.card .material-datatables label').addClass('form-group');

        }
    }
    openModal(id, descripcion) {
        $('#descripcion_cat').html(descripcion);
        this.eliminarID = id;
        $('#modal_eliminar_categoria').modal('show');
    }
    eliminarCategoria() {
        $('#modal_eliminar_categoria').modal('hide');
        this.dataApi.deleteCategoria(this.eliminarID).subscribe(data  => {
            this.categorias.lista = this.categorias.lista.filter(item => item.idCategoria !== this.eliminarID);
            $('#eliminado_exitoso').show();
            const table = $('#datatables').DataTable();
            const tr = $('#categoria_tr' + this.eliminarID).closest('tr');
            table.row(tr).remove().draw();
            this._router.navigate(['categorias']);


        });
    }
    openModalEditar(id, descripcion) {
        console.log(descripcion);
        $('#descripcion_categoria').val(descripcion);
        this.editarID = id;
        $('#modal_editar_categoria').modal('show');
    }
    editarCategoria() {
        $('#modal_editar_categoria').modal('hide');
        const descripcion = $('#descripcion_categoria').val();
        this.dataApi.editCategoria(this.editarID, descripcion).subscribe(data  => {
            $('#editado_exitoso').show();
            console.log(data);
            const table = $('#datatables').DataTable();
            $('#categoria_descripcion' + this.editarID).val(descripcion);
            this._router.navigate(['categorias']);
        });
    }
    getListCategorias() {
        this.dataApi.getAllCategorias().subscribe(categorias => {
            this.categorias = categorias;
            const array = [];
            for (let i = 0; i < this.categorias.lista.length; i++ ) {
                array.push([this.categorias.lista[i].idCategoria, this.categorias.lista[i].descripcion ]) ;

            }
            this.dataTable = {
                headerRow: [ 'ID', 'Descrición' ],
                footerRow: [ 'ID', 'Descrición' ],

                dataRows: array
            };
        } );
    }

}


