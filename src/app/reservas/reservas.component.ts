import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import swal from 'sweetalert2';

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
  fechaDesdeCadenaReserva : any = null;
  fechaHastaCadenaReserva : any = null;
  reservaFichaAsistio : any = null;

  // FICHA
  desdefiltro="2019-01-01";
  putObservacion=false;
  fisioterapeutafiltro="";
  // pacientes: any;
  categoriacarga="";
  categorias:any;
  tipoProducto= 2;
  tipoProductos: any;
  motivo= '';
  diagnostico= '';
  observacion= '';
  fila:any;
  paciente = 1;
  fisioterapeuta=1;
  nombreClienteFicha = "";
  nombreEmpleadoFicha = "";

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
      this.fechaDesdeCadenaReserva = yyyy+mm+dd;
      this.fechaHastaCadenaReserva = yyyy+mm+dd;
      
    }  
    
    this.dataTable = {
        headerRow: [ 'Fecha', 'Hora Inicio', 'Hora Fin', 'Profesional', 'Cliente', 'Observación', 'Asistió (S-Sí / N-No)', 'Estado(R-Reservada / C-Cancelada)' ],
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
        this.fechaDesdeCadenaReserva = fechaDesdeCadena;
        this.fechaHastaCadenaReserva = fechaHastaCadena;
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
  //this.mostrandoActual = "";
  var observacionEditada = <HTMLInputElement>document.getElementById('observacionEditada');
  this.dataApi.putObservacionReserva(observacionEditada.value, this.aEditar).subscribe(reservas => {
    this.dataApi.getReservasFiltrado(this.fechaDesdeCadenaReserva, this.fechaHastaCadenaReserva, this.empleadoSelect, this.clienteSelect).subscribe(reservas => {
      this.reservas = reservas;
      this.ngOnInit();
  });
  swal(
    {
      title: 'Reserva Editada!',
      text: 'Has editado la descripción de la reserva',
      type: 'success',
      confirmButtonClass: "btn btn-success",
      buttonsStyling: false
    }
  )
  });
}

asistio(){
  // this.mostrandoActual = "";
  this.dataApi.putAsistio(true, this.aEditar).subscribe(reservas => {
    this.dataApi.getReservasFiltrado(this.fechaDesdeCadenaReserva, this.fechaHastaCadenaReserva, this.empleadoSelect, this.clienteSelect).subscribe(reservas => {
      this.reservas = reservas;
      this.ngOnInit();
  });
  swal(
    {
      title: 'Reserva marcada como Asistida!',
      text: 'Has editado la reserva',
      type: 'success',
      confirmButtonClass: "btn btn-success",
      buttonsStyling: false
    }
  )
  });
}

noAsistio(){
  // this.mostrandoActual = "";
  this.dataApi.putAsistio(false, this.aEditar).subscribe(reservas => {
    this.dataApi.getReservasFiltrado(this.fechaDesdeCadenaReserva, this.fechaHastaCadenaReserva, this.empleadoSelect, this.clienteSelect).subscribe(reservas => {
      this.reservas = reservas;
      this.ngOnInit();
  });
  swal(
    {
      title: 'Reserva marcada como No Asistida!',
      text: 'Has editado la reserva',
      type: 'success',
      confirmButtonClass: "btn btn-success",
      buttonsStyling: false
    }
  )
  });
}

cancelar(){
  // this.mostrandoActual = "";
  this.dataApi.deleteReserva(this.aEditar).subscribe(reservas => {
    this.dataApi.getReservasFiltrado(this.fechaDesdeCadenaReserva, this.fechaHastaCadenaReserva, this.empleadoSelect, this.clienteSelect).subscribe(reservas => {
      this.reservas = reservas;
      this.ngOnInit();
  });
  swal(
    {
      title: 'Reserva marcada como Cancelada!',
      text: 'Has cancelado la reserva',
      type: 'success',
      confirmButtonClass: "btn btn-success",
      buttonsStyling: false
    }
  )
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

//FICHA
clickAgregarFicha(idPaciente,idEmpleado, reserva, nombreClienteFicha, nombreEmpleadoFicha){
  console.log("nombreClienteFicha", nombreClienteFicha);
  this.nombreClienteFicha = nombreClienteFicha;
  this.nombreEmpleadoFicha = nombreEmpleadoFicha;
  this.dataApi.getCategorias().subscribe((categoria:any)=>{
      this.categorias=categoria;             
  });
  /*this.dataApi.getAllpersonas().subscribe((pacientes:any)=>{
      this.pacientes= pacientes;
  });*/
  this.dataApi.getAlltipoProducto().subscribe((tipoProducto:any)=>{
      this.tipoProductos=tipoProducto;
  }); 
  this.putObservacion=false;
  if(idEmpleado)this.fisioterapeuta = idEmpleado;
  else this.fisioterapeuta=1;
  if (idPaciente) this.paciente = idPaciente;
  else this.paciente = 1;
  this.categoriacarga="";
  this.tipoProducto= 2;
  this.motivo= '';
  this.diagnostico= '';
  this.observacion= '';
  this.reservaFichaAsistio = reserva;
}
sumar() {       
  if(this.putObservacion){
      this.dataApi.modificarfichaClinica(this.observacion,this.fila).subscribe(
          data=>{
              console.log(data);                
          }); 
  }else{
      // this.mostrandoActual = "";
      this.dataApi.addfichaClinicas(this.diagnostico,this.motivo,this.observacion,this.fisioterapeuta,
          this.paciente, this.tipoProducto).subscribe(
          data  => {
              console.log('POST Request is successful ', data);  

              this.dataApi.asistioConFicha(this.reservaFichaAsistio).subscribe(
                reservas => {
                  this.dataApi.getReservasFiltrado(this.fechaDesdeCadenaReserva, this.fechaHastaCadenaReserva, this.empleadoSelect, this.clienteSelect).subscribe(reservas => {
                    this.reservas = reservas;
                    this.ngOnInit();
                  }); 
                  swal(
                    {
                      title: 'Ficha Creada y Reserva marcada como asistida!',
                      text: 'Ficha creada',
                      type: 'success',
                      confirmButtonClass: "btn btn-success",
                      buttonsStyling: false
                    }
                  )             
                });              
          }); 
  }                          
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
