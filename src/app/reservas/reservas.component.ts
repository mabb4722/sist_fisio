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
  mostrandoActual : any = "Mostrando las reservas de hoy.";
  reservas : any;
  clientes : any;
  empleados: any;
  bandera : boolean = true;
  clienteSelect: any;
  empleadoSelect: any;
  aEditar: any = null;
  fechaDeHoy: any = null;
  table : any;

  ngOnInit() {
    console.log('init reservas');
    if (this.bandera){
      this.getListReservas();
      this.getListClientes(null);
      this.getListEmpleados(null);
      this.bandera = false;

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      this.fechaDeHoy = yyyy + '-' +  mm + '-' + dd;
      
    }  
    
    this.dataTable = {
        headerRow: [ 'Fecha', 'Hora Inicio', 'Hora Fin', 'Profesional', 'Cliente', 'Observación', 'Asistió', 'Estado' ],
        footerRow: [ 'Fecha', 'Hora Inicio', 'Hora Fin', 'Profesional', 'Cliente', 'Observación', 'Asistió', 'Estado' ],
        dataRows: []
     };

}

limpiar(){
  var clienteSelect = <HTMLInputElement>document.getElementById('clienteSelect');
  clienteSelect.value = null;

  var buscarClienteText = <HTMLInputElement>document.getElementById('buscarClienteText');
  buscarClienteText.value = null;

  var empleadoSelect = <HTMLInputElement>document.getElementById('empleadoSelect');
  empleadoSelect.value = null;

  var fechaDesde = <HTMLInputElement>document.getElementById('fechaDesde');
  fechaDesde.value = null;

  var fechaHasta = <HTMLInputElement>document.getElementById('fechaHasta');
  fechaHasta.value = null;

  this.clienteSelect = null;
  this.empleadoSelect = null;
}

getListReservas() {
  this.dataApi.getAllReservasHoy().subscribe(reservas => {
      this.reservas = reservas;
      console.log("reservas", reservas);
      console.log("this.reservas", this.reservas);
  } );
}

getListReservasFiltrado(fechaDesde, fechaHasta) {
  this.mostrandoActual = "";
  let fechaDesdeCadena = null;
  let fechaHastaCadena = null;
  if (fechaDesde.value) {
    var splits = fechaDesde.value.split(/[.,\/ -]/);
    for (let i = 0; i < splits.length; i++){
      if ((i == 0 || i == 1) && splits[i].length < 2) {
        splits[i] = '0' + splits[i];
      }
    //  fechaDesdeCadena = splits[i] + fechaDesdeCadena;
    } 
    fechaDesdeCadena = splits[2] + splits[0] + splits[1];
    console.log("fechaDesdeCadena ", fechaDesdeCadena);
  }
  if (fechaHasta.value) {
    var splits = fechaHasta.value.split(/[.,\/ -]/);
    for (let i = 0; i < splits.length; i++) {
      if ((i == 0 || i == 1) && splits[i].length < 2) {
        splits[i] = '0' + splits[i];
      }
      //fechaHastaCadena = fechaHastaCadena + splits[i];
  }
  fechaHastaCadena = splits[2] + splits[0] + splits[1];
  }
  if (fechaDesde.value && fechaHasta.value && fechaDesdeCadena > fechaHastaCadena){
    $('#fechaAlert').removeClass('collapse');
  } else {
    this.dataApi.getReservasFiltrado(fechaDesdeCadena, fechaHastaCadena, this.empleadoSelect, this.clienteSelect).subscribe(reservas => {
        this.reservas = reservas;
        //$("#tableResevas").load(location.href + " #tableResevas");
        this.ngOnInit();
        console.log("taBLE", this.table);
        //$('#datatables').DataTable().ajax.reload();
        //this.table.draw();
        console.log("reservas", reservas);
        console.log("this.reservas", this.reservas);
    });
  }
}

editarDescripcion(row){  
  this.aEditar = row;
  console.log(this.aEditar);
}

editarRes(){
  this.mostrandoActual = "";
  var observacionEditada = <HTMLInputElement>document.getElementById('observacionEditada');
  this.dataApi.putObservacionReserva(observacionEditada.value, this.aEditar).subscribe(reservas => {
    this.dataApi.getReservasFiltrado(null, null, null, null).subscribe(reservas => {
      this.reservas = reservas;
      this.ngOnInit();
  });
  });
}

asistio(){
  this.mostrandoActual = "";
  this.dataApi.putAsistio(true, this.aEditar).subscribe(reservas => {
    this.dataApi.getReservasFiltrado(null, null, null, null).subscribe(reservas => {
      this.reservas = reservas;
      this.ngOnInit();
  });
  });
}

noAsistio(){
  this.mostrandoActual = "";
  this.dataApi.putAsistio(false, this.aEditar).subscribe(reservas => {
    this.dataApi.getReservasFiltrado(null, null, null, null).subscribe(reservas => {
      this.reservas = reservas;
      this.ngOnInit();
  });
  });
}

cancelar(){
  this.mostrandoActual = "";
  this.dataApi.deleteReserva(this.aEditar).subscribe(reservas => {
    this.dataApi.getReservasFiltrado(null, null, null, null).subscribe(reservas => {
      this.reservas = reservas;
      this.ngOnInit();
  });
  });
}

/* public buscar(event, fechaDesde, fechaHasta) {
  console.log('Open ' + fechaDesde.value + fechaHasta.value);
} */

goToAdd(){
  //window.location.assign(window.location.href + "/add");
  window.location.assign(window.location.href.slice(0,-4) + "add");
}

getListClientes(buscarClienteText) {
  /* if (buscarClienteText){
    var clienteSelect = <HTMLInputElement>document.getElementById('buscarClienteText');
    clienteSelect.value = null;
  }  */
  this.dataApi.getClientes().subscribe(clientes => {
      this.clientes = clientes;
      console.log("clientes", clientes);
      console.log("this.clientes", this.clientes);
  } );
}

getListEmpleados(buscarEmpleadoText) {
  this.dataApi.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
      console.log("empleados", empleados);
      console.log("this.empleados", this.empleados);
  } );
}


getListClientesFiltrado(buscarClienteText){
  var filtro=$('input:radio[name=filtroCliente]:checked').val();
  this.dataApi.getClientesFiltrado(filtro, buscarClienteText.value).subscribe(clientes => {
    this.clientes = clientes;
    console.log("clientes", clientes);
    console.log("this.clientes", this.clientes);
} );
  
  console.log("filtro", filtro);
  console.log("buscarClienteText", buscarClienteText.value);
}

getListEmpleadosFiltrado(buscarEmpleadoText){
  var filtro=$('input:radio[name=filtroEmpleado]:checked').val();
  this.dataApi.getEmpleadosFiltrado(filtro, buscarEmpleadoText.value).subscribe(empleados => {
    this.empleados = empleados;
    console.log("empleados", empleados);
    console.log("this.empleados", this.empleados);
} );
  
  console.log("filtro", filtro);
  console.log("buscarClienteText", buscarEmpleadoText.value);
}

seleccionarCliente(event){
  //console.log("seleccionar cliente ",cliente);
  var clienteSelect = <HTMLInputElement>document.getElementById('clienteSelect');
  clienteSelect.value = this.clienteSelect.nombre + ' ' + this.clienteSelect.apellido;

}

seleccionarEmpleado(event){
  var empleadoSelect = <HTMLInputElement>document.getElementById('empleadoSelect');
  empleadoSelect.value = this.empleadoSelect.nombre + ' ' + this.empleadoSelect.apellido;
}

selectChangeHandler(cliente: any){
  //this.clienteSelect = event.target.value;
  console.log("select cliente ", cliente);
  this.clienteSelect = cliente;
}

selectChangeHandlerEmpleado(empleado: any){
  //this.clienteSelect = event.target.value;
  console.log("select empleado ", empleado);
  this.empleadoSelect = empleado;
}

ngAfterViewInit() {
    //if (this.reservas && !this.bandera ){
      /*if(!this.table){
    this.table = $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "retrieve": true,
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar en resultados...",
      }
    });

  //const table = $('#datatables').DataTable();
  //this.table = $('#datatables').DataTable();
  } 
  const table = this.table;

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
}*/
}
}
