import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FisioterapeutaService } from 'src/app/services/fisioterapeuta.service';
declare var $: any;
@Component({
  selector: 'app-agregar-horario-atencion',
  templateUrl: './agregar-horario-atencion.component.html',
  styleUrls: ['./agregar-horario-atencion.component.css']
})
export class AgregarHorarioAtencionComponent implements OnInit {
 
  limit = ['5', '10', '15', '20', '30', '35', '40', '45', '50', '55', '60'];
  semanas = [{ key: 'Domingo', value: '0' }, { key: 'Lunes', value: '1' },
             { key: 'Martes', value: '2' }, { key: 'Miercoles', value: '3' },
             { key: 'Jueves', value: '4' }, { key: 'Viernes', value: '5' },
             { key: 'Sabado', value: '6' }];

 


  valorpersona = '';
  nombrebusq = '';
  apellidobusq = '';
  personas: any[];
  putfisio:boolean = false;

  formAtencionForm: FormGroup;
  @Output() queryEvent = new EventEmitter<Object>();
  @Input() listEmpleado: any[];
  @Input()
  public set editarHorario(update) {
    this.putfisio = false;
    if (update !== undefined) {
      this.putfisio = true;
      const diasemana = this.semanas.find( sm => sm.key === update.diaCadena);
      this.formAtencionForm = new FormGroup({
        idEmpleado: new FormGroup({
          idPersona: new FormControl({value: update['idEmpleado']}, [Validators.required])
        }),
       dia: new FormControl(diasemana.value, [Validators.required]),
       horaAperturaCadena: new FormControl(update.horaApertura, [Validators.required]),
       horaCierreCadena: new FormControl(update.horaCierre, [Validators.required]),
       intervaloMinutos: new FormControl(update.intervaloMinutos, [Validators.required]),
       idPersonaHorarioAgenda: new FormControl(update.idPersonaHorarioAgenda, [Validators.required]),
    });

    }
  }

   ngOnInit() {  
  }

  


  constructor(public servicio_fisio: FisioterapeutaService) {
    this.formAtencionForm = this.createFormGroup();

    this.servicio_fisio.getFisioterapeutaSistema().subscribe((resp: any) => {
      this.listEmpleado = resp;
  
   });

   }

 


  createFormGroup() {
    return new FormGroup({
        idEmpleado: new FormGroup({
          idPersona: new FormControl('')
        }),
       dia: new FormControl('', [Validators.required]),
       horaAperturaCadena: new FormControl('', [Validators.required]),
       horaCierreCadena: new FormControl('', [Validators.required]),
       intervaloMinutos: new FormControl('', [Validators.required]),
    });
  }


  uploadComplete() {

    if (this.formAtencionForm.valid) {
      const formvalues = this.formAtencionForm.value;

      formvalues['horaAperturaCadena'] = formvalues['horaAperturaCadena'].substr(0, 2) + formvalues['horaAperturaCadena'].substr(3, 2);
      formvalues['horaCierreCadena'] = formvalues['horaCierreCadena'].substr(0, 2) + formvalues['horaCierreCadena'].substr(3, 2);
    this.queryEvent.emit(this.formAtencionForm.value);
    }
    $('#exampleModal').modal('hide');
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

  revert() {
    this.formAtencionForm.reset();
  }

  cargarpersonas(){
    this.personas=this.listEmpleado;
  
  }

  closemodalFisio() {
    this.valorpersona = '';
    $('#upload-avatar').modal('hide');
  }

}

