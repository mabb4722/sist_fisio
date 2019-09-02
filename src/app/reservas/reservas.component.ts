import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataApiService } from '../services/data-api.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})

export class ReservasComponent implements OnInit, AfterViewInit {
  public dataTable: DataTable;

  constructor(private dataApi: DataApiService) { }
  reservas : any;
  bandera : boolean;

  ngOnInit() {
    console.log('init reservas');
    this.getListReservas();
    this.bandera = false;

    this.dataTable = {
        headerRow: [ 'CI', 'Nombre', 'Local', 'Fisioterapeuta', 'Fecha', 'Inicio', 'Fin', 'Estado', 'Asistió' ],
        footerRow: [ 'CI', 'Nombre', 'Local', 'Fisioterapeuta', 'Fecha', 'Inicio', 'Fin', 'Estado', 'Asistió' ],
        dataRows: []
     };

}

getListReservas() {
  this.dataApi.getAllReservasHoy().subscribe(reservas => {
      this.reservas = reservas;
      console.log("reservas", reservas);
      console.log("this.reservas", this.reservas);
  } );
}

ngAfterViewInit() {
  if (this.reservas && !this.bandera ){
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
}
