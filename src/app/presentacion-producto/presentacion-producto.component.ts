import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DataApiService } from '../services/presentacion-producto/data-api.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-presentacion-producto',
  templateUrl: './presentacion-producto.component.html',
  styleUrls: ['./presentacion-producto.component.css']
})

export class PresentacionProductoComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public dataTable: DataTable;
  public presentacionProductos: any;
  public bandera: boolean;

  constructor(private dataApi: DataApiService) {}

  ngOnInit() {
    this.getListPresentacionProductos();
  }

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {
    if (this.presentacionProductos && !this.bandera) {
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
      table.on('click', '.edit', function (e) {
        let $tr = $(this).closest('tr');
        if ($($tr).hPasClass('child')) {
          $tr = $tr.prev('.parent');
        }

        var data = table.row($tr).data();
        alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        e.preventDefault();
      });

      // Delete a record
      table.on('click', '.remove', function (e) {
        const $tr = $(this).closest('tr');
        table.row($tr).remove().draw();
        e.preventDefault();
      });

      //Like record
      table.on('click', '.like', function (e) {
        alert('You clicked on Like button');
        e.preventDefault();
      });

      $('.card .material-datatables label').addClass('form-group');

    }
  }

  getListPresentacionProductos() {
    this.dataApi.getAllPresentacionProducto().subscribe(presentacionProductos => {
      this.presentacionProductos = presentacionProductos;

      const array = [];
      for (let i = 0; i < this.presentacionProductos.lista.length; i++) {
        array.push(
          [ this.presentacionProductos.lista[i].idPresentacionProducto, 
            this.presentacionProductos.lista[i].nombre, 
            this.presentacionProductos.lista[i].descripcion,
            this.presentacionProductos.lista[i].idProducto.idProducto, 
            this.presentacionProductos.lista[i].idProducto.idTipoProducto.idTipoProducto ]
        );
      }

      this.dataTable = {
        headerRow: ['ID', 'Nombre', 'Descripción', 'ID Producto', 'ID Tipo de Producto'],
        footerRow: ['ID', 'Nombre', 'Descripción', 'ID Producto', 'ID Tipo de Producto'],
        dataRows: array
      };

    });
  }
}
