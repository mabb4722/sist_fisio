// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import {Component, OnInit, AfterViewInit,   AfterViewChecked} from '@angular/core';
import {DataApiService} from '../../services/data-api.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-data-table-cmp',
    templateUrl: 'datatable.component.html'
})

export class DataTableComponent implements OnInit, AfterViewInit, AfterViewChecked {
    public dataTable: DataTable;
    constructor(private dataApi: DataApiService) { }
    categorias: any;
    bandera : boolean;

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
                    search: "_INPUT_",
                    searchPlaceholder: "Search records",
                }

            });

            const table = $('#datatables').DataTable();

            // Edit record
            table.on('click', '.edit', function(e) {
                let $tr = $(this).closest('tr');
                if ($($tr).hasClass('child')) {
                    $tr = $tr.prev('.parent');
                }

                var data = table.row($tr).data();
                alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
                e.preventDefault();
            });

            // Delete a record
            table.on('click', '.remove', function(e) {
                const $tr = $(this).closest('tr');
                table.row($tr).remove().draw();
                e.preventDefault();
            });

            //Like record
            table.on('click', '.like', function(e) {
                alert('You clicked on Like button');
                e.preventDefault();
            });

            $('.card .material-datatables label').addClass('form-group');

        }
    }

    getListCategorias() {
        // this.dataApi.getAllCategorias().subscribe(categorias => {
        //     this.categorias = categorias;
        //     const array = [];
        //     for (let i = 0; i < this.categorias.lista.length; i++ ) {
        //         array.push([this.categorias.lista[i].idCategoria, this.categorias.lista[i].descripcion ]) ;

        //     }
        //     this.dataTable = {
        //         headerRow: [ 'Name', 'Position' ],
        //         footerRow: [ 'Name', 'Position' ],

        //         dataRows: array
        //     };
        // } );
    }
}


