// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import {Component, OnInit, AfterViewInit,   AfterViewChecked} from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {ActivatedRoute} from '@angular/router';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-categoria',
    templateUrl: 'subcategorias.component.html'
})

export class SubcategoriasComponent implements OnInit, AfterViewInit, AfterViewChecked {
    public dataTable: DataTable;
    constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }
    subCategorias: any;
    bandera: boolean;
    public idCategoria: string;

    ngOnInit() {
        $('.navbar-brand').html('Sub Categorías de la categoría');
        this.idCategoria = this.route.snapshot.paramMap.get('idCategoria');
        this.getListSubCategorias();
        this.bandera = false;
    }

    ngAfterViewInit() {

    }
    ngAfterViewChecked()  {
        if (this.subCategorias && !this.bandera ) {
            this.bandera = true;
            $('#datatables').DataTable({
                'pagingType': 'full_numbers',
                'lengthMenu': [
                    [10, 25, 50, -1],
                    [10, 25, 50, 'All']
                ],
                responsive: true,
                language: {
                    search: '_INPUT_',
                    searchPlaceholder: 'Search records',
                }

            });

            const table = $('#datatables').DataTable();

            // Edit record
            table.on('click', '.edit', function(e) {
                let $tr = $(this).closest('tr');
                if ($($tr).hasClass('child')) {
                    $tr = $tr.prev('.parent');
                }

                let data = table.row($tr).data();
                alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
                e.preventDefault();
            });

            // Delete a record
            table.on('click', '.remove', function(e) {
                const $tr = $(this).closest('tr');
                table.row($tr).remove().draw();
                e.preventDefault();
            });

            // Like record
            table.on('click', '.like', function(e) {
                alert('You clicked on Like button');
                e.preventDefault();
            });

            $('.card .material-datatables label').addClass('form-group');

        }
    }

    getListSubCategorias() {
       const result = {'idCategoria': {'idCategoria': this.idCategoria}};
       console.log(result);
        this.dataApi.getSubcategorias(result).subscribe(categorias => {
            this.subCategorias= categorias;
            console.log('aca', this.subCategorias)
        } );
    }
}


