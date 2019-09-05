// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import {Component, OnInit, AfterViewInit,   AfterViewChecked} from '@angular/core';
import {DataApiService} from '../services/data-api.service';


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
    constructor(private dataApi: DataApiService) { }
    categorias: any;
    bandera: boolean;

    ngOnInit() {
        this.getListCategorias();
        this.bandera = false;


    }

    ngAfterViewInit() {

    }
    ngAfterViewChecked()  {
        if (this.categorias && !this.bandera ){
            this.bandera = true;
            $('#datatables').DataTable({
                "pagingType": "full_numbers",
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                responsive: true,
                language: {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "Último",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }

            });

            $('.card .material-datatables label').addClass('form-group');

        }
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


