import { Component, OnInit } from '@angular/core';
import { FisioterapeutaService } from 'src/app/services/fisioterapeuta.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-excepcion',
  templateUrl: './excepcion.component.html',
  styleUrls: ['./excepcion.component.css']
})
export class ExcepcionComponent implements OnInit {
  listFisio: any = [];

  listEmpleado: any[];

  iterFisio: any = [];

  config: any;

  query: any;

  modalShow: boolean = true;
  nombre_modal = '';

  editarHorario:any;
  operacion:any;

  constructor(public servicio_fisio: FisioterapeutaService) {

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };

    this.query = {
                    empleado: {idEmpleado: {idPersona: null}, flagEsHabilitar: null, fechaCadena: null},
                    orderBy: 'idHorarioExcepcion', order: 'desc', inicio: 0, cantidad: 10
                };
    // para listar en la tabla :listFisio
    this.cargarFisioterapeuta();
    // para selecionar el nombre del empleado en el filtrado :listEmpleado
    this.cargarFisioterapeutaSistema();

  }





/*
  this.query = {
    empleado: {idEmpleado: {idPersona: null}, dia: null},
    orderBy: null, order: null, inicio: 0, cantidad: 3
  };
*/
  pageChanged(event) {
    this.listFisio = [];
    this.config.currentPage = event;

   this.query.inicio = (event - 1) * (this.query.cantidad);
   this.cargarFisioterapeuta();
    console.log(event);
  }
  cargarFisioterapeuta() {
    this.servicio_fisio.cargarFisioterapeutaExcepcion(this.query).subscribe(resp => {
    this.listFisio = resp.listFisio;
    this.config.itemsPerPage = this.query.cantidad;
    this.config.totalItems = resp.totalDatos;
 });
}





cargarFisioterapeutaSistema(all?: String) {
    this.servicio_fisio.getFisioterapeutaSistema().subscribe((resp: any) => {
      this.listEmpleado = resp;
      if ( all !== 'buttonAddHorario') {
        this.listEmpleado.push({ key: 'Todos', value: '' });
      }
   });
  }


  ngOnInit() {


  }

  buttonModal(event,row?) {
    this.cargarFisioterapeutaSistema(event);
    this.editarHorario=row;

    this.operacion=event;
    console.log(row);
    if ( event === 'buttonAddHorario' || event === 'modificar' ) {

       this.nombre_modal = 'Agregar horario de excepcion de un Doctor';
      this.modalShow = true;
    } else {
      this.nombre_modal = 'Filtrar horario de excepcion de un Doctor';
      this.modalShow = false;
    }
  }


  onSubmitgetFisio(result ) {
    this.query = result;
    this.  cargarFisioterapeuta();



  }

  onSubmitpostExcepcionFisio(result ) {
    if (this.operacion !== 'modificar' ){
      this.servicio_fisio.postHorarioExcepcionFisioterapeuta(JSON.stringify(result))
      .subscribe(resp => {
       this.cargarFisioterapeuta();
       console.log(resp);
       swal({
         title: 'Horario Excepcion',
         text: 'Se ha guardado la excepcion correctamente',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-success',
         type: 'success'
     // tslint:disable-next-line: deprecation
       }).catch(swal.noop);
     });
    } else {
      this.servicio_fisio.putHorarioExcepcionFisioterapeuta(JSON.stringify(result))
      .subscribe(resp=> {
       this.cargarFisioterapeuta();
       console.log(resp);
       swal({
         title: 'Horario Excepcion',
         text: 'Se ha modificado correctamente',
         buttonsStyling: false,
         confirmButtonClass: 'btn btn-success',
         type: 'success'
     // tslint:disable-next-line: deprecation
       }).catch(swal.noop);
     });


    }
  }

  deleteHorarioAtencion(id){
    this.servicio_fisio.deleteHorarioExcepcionFisioterapeuta(id).subscribe(resp=> {
      this.cargarFisioterapeuta();
      swal({
        title: 'Horario Excepcion Fisioterapeuta',
        text: 'Se ha eliminado correctamente',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success',
        type: 'success'
    // tslint:disable-next-line: deprecation
    }).catch(swal.noop);
  
  });
  

  }


}
