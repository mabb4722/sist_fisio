import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FisioterapeutaService } from 'src/app/services/fisioterapeuta.service';

declare var $: any;

@Component({
  selector: 'app-filtrar-horario-atencion',
  templateUrl: './filtrar-horario-atencion.component.html'
})

export class FiltrarHorarioAtencionComponent implements OnInit {

  limit = ['1', '2', '3', '4', '5', '6', '7', '10', '15', '20'];
  ordencampo = [{ key: 'Empleado', value: 'idEmpleado'}, 
                { key: 'Semana', value: 'dia'},{ key: 'default', value: 'idPersonaHorarioAgenda'}];
  orden = [{ key: 'Ascendente', value: 'asc' }, { key: 'Descendente', value: 'desc'}];

  semanas = [{ key: 'Domingo', value: '0' }, { key: 'Lunes', value: '1' },
             { key: 'Martes', value: '2' }, { key: 'Miercoles', value: '3' },
             { key: 'Jueves', value: '4' }, { key: 'Viernes', value: '5' },
             { key: 'Sabado', value: '6' }, { key: 'Todos', value: '' }
            ];

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
          dia: new FormControl(),
       }),
       orderBy: new FormControl('idPersonaHorarioAgenda'),
       order: new FormControl('desc'),
       inicio: new FormControl(0),
       cantidad: new FormControl(10),
    });
  }


  uploadComplete() {
    this.queryEvent.emit(this.formAtencionForm.value);
    $('#exampleModal').modal('hide');
  }


  closemodalFisio() {
    this.valorpersona = '';
    $('#upload-avatar').modal('hide');
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
      this.personas =  this.personas.filter(x => x.key.split(' ')[1].includes(this.apellidobusq));
    }
   

    if (this.personas.length === 0) {
    } else {
      this.formAtencionForm.value['empleado']['idEmpleado']['idPersona'] =  this.personas[0].value;
    }




  }

  cargarpersonas(){
    this.personas=this.listEmpleado;
  
  }

  revert() {
    this.formAtencionForm.reset();
  }

 
}



