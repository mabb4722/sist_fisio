import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-add-reserva',
  templateUrl: './add-reserva.component.html',
  styleUrls: ['./add-reserva.component.css']
})
export class AddReservaComponent implements OnInit {

  empleadoSelect: any;
  clienteSelect: any;
  agendaChoose: any;
  empleados: any;
  clientes: any;
  agendas: any = null;
  reservadosChecked: any = false; 
  fechaSelected: any;
  first: any = true;

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    if(this.first) this.seleccionarEmpleadoLogueado();
    this.getListEmpleados(null);
    this.getListClientes(null);
    //this.getListAgendas('20190915', 'S', 4);
  }

  goToReservas(){
    window.location.assign(window.location.href.slice(0,-4) + "/list");
  }

  chooseAgenda(agenda){
    console.log("choose angenda", agenda);
    this.agendaChoose = agenda;
  }

  postReserva(){
    //var agenda=$('input:radio[name=group]:checked').val();
    //console.log("AGENDA SELECCIONADA", agenda);
    //console.log("AGENDA fechaCadena", agenda.fechaCadena);
    var observacion = <HTMLInputElement>document.getElementById('observacion');
    if (this.clienteSelect && this.agendaChoose){
    this.dataApi.postReserva(this.agendaChoose.fechaCadena, this.agendaChoose.horaInicioCadena, this.agendaChoose.horaFinCadena, this.agendaChoose.idEmpleado.idPersona, this.clienteSelect.idPersona, observacion.value).subscribe(agendas => {
      this.getAgendas(this.fechaSelected);
      swal(
        {
          title: 'Reserva Creada!',
          text: '',
          type: 'success',
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false
        }
      )
    } );
    } else {
      alert("Seleccione un cliente y una agenda.");
    }
  }

  getAgendas(fecha){
    this.fechaSelected = fecha;
    let disponible;
    let reservados = <HTMLInputElement>document.getElementById("reservados");
    console.log("value", <HTMLInputElement>document.getElementById("reservados"));
    if (reservados.checked){
      disponible = 'N';
    } else {
      disponible = 'S';
    }
    console.log("disponible", disponible);
    let fechaCadena = null;
    if (fecha.value) {
      var splits = fecha.value.split(/[.,\/ -]/);
      for (let i = 0; i < splits.length; i++){
        if ((i == 0 || i == 1) && splits[i].length < 2) {
          splits[i] = '0' + splits[i];
        }
    } 
    fechaCadena = splits[2] + splits[0] + splits[1];
    console.log("fechaCadena ", fechaCadena);
    }
    if (!fechaCadena || !this.empleadoSelect) alert("Complete todos los campos.");
    this.getListAgendas(fechaCadena, disponible, this.empleadoSelect);
  }

  selectChangeHandlerEmpleado(empleado: any){
    console.log("select empleado ", empleado);
    this.empleadoSelect = empleado;
  }

  selectChangeHandlerCliente(cliente: any){
    console.log("select cliente ", cliente);
    this.clienteSelect = cliente;
  }

  seleccionarEmpleado(event){
    var empleadoSelect = <HTMLInputElement>document.getElementById('empleadoSelect');
    empleadoSelect.value = this.empleadoSelect.nombre + ' ' + this.empleadoSelect.apellido;
  }

  seleccionarEmpleadoLogueado(){
    var empleadoSelect = <HTMLInputElement>document.getElementById('empleadoSelect');
    empleadoSelect.value = localStorage.getItem('usuario');
    this.dataApi.getUsuarioByID(localStorage.getItem('usuarioWeb')).subscribe(usuarios => {
      this.empleadoSelect = usuarios;
    });
  }

  seleccionarCliente(event){
    var clienteSelect = <HTMLInputElement>document.getElementById('clienteSelect');
    clienteSelect.value = this.clienteSelect.nombre + ' ' + this.clienteSelect.apellido;
  }

  getListAgendas(fecha, disponible, idEmpleado) {
    this.dataApi.getAgendasParaReservas(fecha, disponible, idEmpleado).subscribe(agendas => {
      console.log("AGENDAS");
      console.log("agendas", agendas);  
      this.agendas = agendas;
        console.log("this.agendas", this.agendas);
    } );
  }

  getListEmpleados(buscarEmpleadoText) {
    this.dataApi.getEmpleados().subscribe(empleados => {
        this.empleados = empleados;
        console.log("empleados", empleados);
        console.log("this.empleados", this.empleados);
    } );
  }

  getListClientes(buscarClienteText){
    this.dataApi.getClientes().subscribe(clientes => {
      this.clientes = clientes;
      console.log("clientes", clientes);
      console.log("this.clientes", this.clientes);
  } );
  }

  getListEmpleadosFiltrado(buscarEmpleadoText){
    var filtro=$('input:radio[name=filtroEmpleado]:checked').val();
    this.dataApi.getEmpleadosFiltrado(filtro, buscarEmpleadoText.value).subscribe(empleados => {
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
  }
}
