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
  constructor(private dataApi: DataApiService, private _router: Router) { }
  ngOnInit() {
  }
  
  onAddCategoria() {
      const fechaNacimiento=new Date($('#fecha_de_nacimiento_paciente').val()).toISOString().substring(0,10)+" 00:00:00";
      const paciente={
        "nombre":  $('#nombre_paciente').val(),
        "apellido":  $('#apellido_paciente').val(),
        "email":  $('#email_paciente').val(),
        "telefono":  $('#telefono_paciente').val(),
        "ruc":  $('#ruc_paciente').val(),
        "cedula":  $('#cedula_paciente').val(),
        "tipoPersona":  "FISICA",
        "fechaNacimiento":  $('#fecha_de_nacimiento_paciente').val()!="" ? fechaNacimiento : ""
      }
      console.log(paciente)
      if (paciente) {
          this.dataApi.addPaciente(paciente).subscribe(
              data  => {
                  console.log('#/categorias/categorias_list');
                  this._router.navigate(['/pacientes/listar']);
              });
      }
  }
}
