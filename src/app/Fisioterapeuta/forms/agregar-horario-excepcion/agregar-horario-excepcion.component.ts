import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FisioterapeutaService } from 'src/app/services/fisioterapeuta.service';

declare var $: any;

@Component({
  selector: 'app-agregar-horario-excepcion',
  templateUrl: './agregar-horario-excepcion.component.html'
})
export class AgregarHorarioExcepcionComponent implements OnInit {
  limit = ['5', '10', '15', '20', '30', '35', '40', '45', '50', '55', '60'];
  semanas = [{ key: 'Domingo', value: '0' }, { key: 'Lunes', value: '1' },
             { key: 'Martes', value: '2' }, { key: 'Miercoles', value: '3' },
             { key: 'Jueves', value: '4' }, { key: 'Viernes', value: '5' },
             { key: 'Sabado', value: '6' }];


  habilitar = [{ key: 'S', value: 'S' }, { key: 'N', value: 'N' }];


  valorpersona = '';
  nombrebusq = '';
  apellidobusq = '';
  personas: any[];
  putfisio:boolean = false;

  formAtencionForm: FormGroup;
  @Output() queryEvent = new EventEmitter<Object>();
  @Input()
  public set editarHorario(update) {
    this.putfisio = false;
    if (update !== undefined) {
      this.putfisio = true;
      this.formAtencionForm = new FormGroup({
        idEmpleado: new FormGroup({
          idPersona: new FormControl(update['idEmpleado'], [Validators.required])
        }),
        horaAperturaCadena: new FormControl(update.horaAperturaCadena),
        fechaCadena: new FormControl(update.fecha, [Validators.required]),
       horaCierreCadena: new FormControl(update.horaCierreCadena),
       flagEsHabilitar: new FormControl(update.flagEsHabilitar),
       intervaloMinutos: new FormControl(update.intervaloMinutos),
       idHorarioExcepcion: new FormControl(update.idHorarioExcepcion),
    });

    }
  }









  listEmpleado: any[];
 
  
  constructor(public servicio_fisio: FisioterapeutaService) {
    this.formAtencionForm = this.createFormGroup();

    this.servicio_fisio.getFisioterapeutaSistema().subscribe((resp: any) => {
      this.listEmpleado = resp;
   });
   

   }

  ngOnInit() {

  }


  createFormGroup() {
    return new FormGroup({
        idEmpleado: new FormGroup({
            idPersona: new FormControl('')
        }),
       flagEsHabilitar: new FormControl('', [Validators.required]),
       fechaCadena: new FormControl('', [Validators.required]),
       horaAperturaCadena: new FormControl(''),
       horaCierreCadena: new FormControl(''),
       intervaloMinutos: new FormControl(''),
    });
  }


  closemodalFisio() {
    this.valorpersona = 'funciona';
    $('#upload-avatar').modal('toggle');
  }

  uploadComplete() {

    if (this.formAtencionForm.valid) {
      const formvalues = this.formAtencionForm.value;

      

      formvalues['horaAperturaCadena'] = formvalues['horaAperturaCadena'].substr(0, 2) + formvalues['horaAperturaCadena'].substr(3, 2);
      formvalues['horaCierreCadena'] = formvalues['horaCierreCadena'].substr(0, 2) + formvalues['horaCierreCadena'].substr(3, 2);
      formvalues['fechaCadena'] = formvalues['fechaCadena'].substr(0, 4) +
                                  formvalues['fechaCadena'].substr(5, 2) + formvalues['fechaCadena'].substr(8, 3);

    console.log(formvalues);
    this.queryEvent.emit(formvalues);
    }
    $('#exampleModal').modal('hide');

  }


  revert() {
    this.formAtencionForm.reset();
  }


  handleClick(event: Event) {
    console.log(this.listEmpleado);
    this.valorpersona = this.formAtencionForm.value[''];
    console.log(this.formAtencionForm.value['idEmpleado']['idPersona']);

    const id = this.formAtencionForm.value['idEmpleado']['idPersona'];
    console.log(id);

    let ar =  this.listEmpleado.find(x => x.value == id);
    console.log(ar);
    this.valorpersona = ar.key;
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
      this.formAtencionForm.value['idEmpleado']['idPersona'] =  this.personas[0].value;
    }


  }
  cargarpersonas(){
    this.personas=this.listEmpleado;
  
  }



}

