import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FisioterapeutaService } from 'src/app/services/fisioterapeuta.service';


declare var $: any;

@Component({
  selector: 'app-filtrar-horario-excepcion',
  templateUrl: './filtrar-horario-excepcion.component.html'
})

export class FiltrarHorarioExcepcionComponent implements OnInit {

  limit = ['1', '2', '3', '4', '5', '6', '7', '10', '15', '20'];
  ordencampo = [{ key: 'Empleado', value: 'empleado' }, { key: 'Fecha', value: 'idHorarioExcepcion'}, 
                {key: 'default', value: 'idHorarioExcepcion'}];
  orden = [{ key: 'Ascendente', value: 'asc' }, { key: 'Descendente', value: 'desc'}];

  habilitar = [{ key: 'S', value: 'S' }, { key: 'N', value: 'N' }, { key: 'Todos', value: '' } ];

  valorpersona = '';
  nombrebusq = '';
  apellidobusq = '';


  formAtencionForm: FormGroup;
  @Output() queryEvent = new EventEmitter<Object>();
  @Input() listEmpleado: any[];
  personas: any[];

  constructor(public servicio_fisio: FisioterapeutaService) {
    this.formAtencionForm = this.createFormGroup();

    this.servicio_fisio.getFisioterapeutaSistema().subscribe((resp: any) => {
      this.listEmpleado = resp;
      this.listEmpleado.push({ key: 'Todos', value: '' });
   });

   }

  ngOnInit() {

  }


  createFormGroup() {
    return new FormGroup({
        empleado: new FormGroup({
          idEmpleado: new FormGroup({
            idPersona: new FormControl()
          }),
          flagEsHabilitar: new FormControl(),
          fechaCadena: new FormControl(),
       }),
       orderBy: new FormControl('idHorarioExcepcion'),
       order: new FormControl('desc'),
       inicio: new FormControl(0),
       cantidad: new FormControl(10),
    });
  }


  uploadComplete() {

    const fecha = this.formAtencionForm.value['empleado']['fechaCadena'];
    const orderby = this.formAtencionForm.value['orderby'];

    if (orderby === null) {
      this.formAtencionForm.value['orderby'] = 'idHorarioExcepcion';
      this.formAtencionForm.value['order'] = 'desc';

    }


    if (fecha !== null) {
      this.formAtencionForm.value['empleado']['fechaCadena'] =
      fecha.substr(0, 4) + fecha.substr(5, 2) + fecha.substr(8, 3);

    }

    this.queryEvent.emit(this.formAtencionForm.value);
    $('#exampleModal').modal('hide');
  }


  revert() {
    this.formAtencionForm.reset();
  }

  closemodalFisio() {
    this.valorpersona = '';
    $('#upload-avatar').modal('toggle');
  }

  handleClick(event: Event) {
    console.log(this.listEmpleado[0]);
    this.valorpersona = this.formAtencionForm.value[''];
    console.log(this.formAtencionForm.value['empleado']['idEmpleado']['idPersona']);

    const id = this.formAtencionForm.value['empleado']['idEmpleado']['idPersona'];


    const ar =  this.listEmpleado.find(x => x.value === id);
    console.log(ar);
    if(ar!== undefined){

      this.valorpersona = ar.key;
    }
  
    $('#upload-avatar').modal('toggle');
  }

  onSearchChange(campo, searchValue: string)
  {
    this.personas = this.listEmpleado;

    if (campo === 'nombre') {
        this.nombrebusq = searchValue;
    } else {
        this.apellidobusq = searchValue;
    }
 
    if (this.nombrebusq.length > 0) {
      this.personas =  this.personas.filter(x => x.key.split(' ')[0].includes(this.nombrebusq));
    }

    if (this.apellidobusq.length > 0) {
      this.personas =  this.personas.filter(x => x.key.split(' ')[0].includes(this.apellidobusq));
    }
   

    if (this.personas.length === 0) {
    } else {
      this.formAtencionForm.value['empleado']['idEmpleado']['idPersona'] =  this.personas[0].value;
    }

  }

  cargarpersonas(){
    this.personas=this.listEmpleado;
  
  }

  onChange(deviceValue) {
    console.log(deviceValue);
}
}
