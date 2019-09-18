import { Component, OnInit } from '@angular/core';

import {DataApiService} from '../../services/pacientes/data-api.service';
import {Router} from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-agregar-pacientes',
  templateUrl: './agregar-pacientes.component.html',
  styleUrls: ['./agregar-pacientes.component.css']
})
export class AgregarPacientesComponent implements OnInit {
  public agregarError;
  public agregarSuccess;
  constructor(private dataApi: DataApiService, private _router: Router) { }
  ngOnInit() {
  }
  
  onAddCategoria() {
      let paciente={};

      paciente={
        "nombre":  $('#nombre_paciente').val(),
        "apellido":  $('#apellido_paciente').val(),
        "email":  $('#email_paciente').val(),
        "telefono":  $('#telefono_paciente').val(),
        "ruc":  $('#ruc_paciente').val(),
        "cedula":  $('#cedula_paciente').val(),
        "tipoPersona":  "FISICA"      
      }

      if($('#fecha_de_nacimiento_paciente').val()!=""){
        paciente={
          ...paciente,
          "fechaNacimiento":  new Date($('#fecha_de_nacimiento_paciente').val()).toISOString().substring(0,10)+" 00:00:00"
        }
      }

      if (paciente) {
          this.dataApi.addPaciente(paciente).subscribe(
              data  => {
                this.agregarSuccess=data.idPersona;
                $('#agregar_success').show();
              }, error => {this.agregarError = error
                $('#agregar_error').show();
              });
      }
  }

  closeAgregarError(){
    $('#agregar_error').hide();
  }

  closeAgregarSuccess(){
    $('#agregar_success').hide();
  }
}
