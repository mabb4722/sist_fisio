import { Component, OnInit, Input } from '@angular/core';
import { FisioterapeutaService } from 'src/app/services/fisioterapeuta.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css']
})




export class AtencionComponent implements OnInit {
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
                    empleado: {idEmpleado: {idPersona: null}, dia: null},
                    orderBy: 'idPersonaHorarioAgenda', order: 'desc', inicio: 0, cantidad: 10
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
    this.servicio_fisio.cargarFisioterapeutaquery(this.query).subscribe(resp => {
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

       this.nombre_modal = 'Agregar horario de atención de un Doctor';
      this.modalShow = true;
    } else {
      this.nombre_modal = 'Filtrar horario de atención de un Doctor';
      this.modalShow = false;
    }
  }


  onSubmitgetFisio(result ) {
    this.query = result;
    this.  cargarFisioterapeuta();
  }


  

  postHorarioAtencion(result ) {

    if( this.operacion === 'modificar' ){
        console.log(result);
        console.log('esto es una modificacion nomas');
        this.servicio_fisio.putHorarioAtencionFisioterapeuta(JSON.stringify(result))
        .subscribe(resp=> {
         this.cargarFisioterapeuta();
         console.log(resp);
         swal({
           title: 'Horario Fisioterapeuta',
           text: 'Se ha modificado correctamente',
           buttonsStyling: false,
           confirmButtonClass: 'btn btn-success',
           type: 'success'
       // tslint:disable-next-line: deprecation
         }).catch(swal.noop);
       }, (error) => {
        console.log(error);
        swal({title:'Horario Excepcion',
              text:error.error,
        type:'error'})
      });




    }else{




      console.log(JSON.stringify(result));
       this.servicio_fisio.postHorarioAtencionFisioterapeuta(JSON.stringify(result))
       .subscribe(resp=> {
        this.cargarFisioterapeuta();
        console.log(resp);
        swal({
          title: 'Horario Fisioterapeuta',
          text: 'Se ha guardado correctamente',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
      // tslint:disable-next-line: deprecation
        }).catch(swal.noop);
      });

    }

  }

  deleteHorarioAtencion(id) {
    this.servicio_fisio.deleteHorarioAtencionFisioterapeuta(id).subscribe(resp=> {
      this.cargarFisioterapeuta();
      swal({
        title: 'Horario Fisioterapeuta',
        text: 'Se ha eliminado correctamente',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success',
        type: 'success'
    // tslint:disable-next-line: deprecation
    }).catch(swal.noop);
  
  });
  }


}
