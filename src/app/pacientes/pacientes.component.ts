import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../services/pacientes/data-api.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-pacientes',
    templateUrl: './pacientes.component.html',
    styleUrls: ['./pacientes.component.css']
})

export class PacientesComponent implements OnInit{
    public dataTable: DataTable;
    public cantidadTotalDePersonas = 0;
    public pageSizeOptions = [5, 10, 25, 100];
    public editarError;

    private filtros = {
        orderBy: 'idPersona',
        orderDir: 'asc',
        inicio: 0,
        cantidad: 10,
        tipo_de_busqueda : 'contenga',
        tipo_de_persona: 'All'
    };

    pacientes: any;
    eliminarID: any;
    editarID: any;
    personaEditar: any;
    eliminarError: any;
    constructor(private dataApi: DataApiService, private _router: Router) {}

    ngOnInit() {
        this.getListPacientes(this.filtros);
    }

    sortData(sort: Sort) {
        this.filtros.orderBy = sort.active;
        this.filtros.orderDir = sort.direction;
        this.getListPacientes(this.filtros);
    }

    paginacion(event) {
        this.filtros.cantidad = event.pageSize;
        this.filtros.inicio = event.pageSize * event.pageIndex;
        this.getListPacientes(this.filtros);
    }

    openModal(id) {
        $('#id_persona').html(id);
        this.eliminarID = id;
        $('#modal_eliminar_persona').modal('show');
    }

    eliminarPersona() {
        $('#modal_eliminar_persona').modal('hide');
        this.dataApi.deletePersona(this.eliminarID).subscribe(data => {
            this.pacientes.lista = this.pacientes.lista.filter(item => item.idPersona !== this.eliminarID);
            $('#eliminado_exitoso').show();
            this.getListPacientes(this.filtros);
            this._router.navigate(['pacientes/listar']);
        },
        error => {this.eliminarError = error
            $('#eliminar_error').show();
        });
    }

    closeEliminarError(){
        $('#eliminar_error').hide();
    }

    closeEliminarSuccess(){
        $('#eliminado_exitoso').hide();
    }

    getListPacientes(filtros) {
        this.dataApi.getAllPacientes(filtros).subscribe(pacientes => {
            this.pacientes = pacientes;
            this.cantidadTotalDePersonas = this.pacientes.totalDatos;
            const array = [];
            for (let i = 0; i < this.pacientes.lista.length; i++) {
                array.push(
                    [this.pacientes.lista[i].idPersona, this.pacientes.lista[i].nombre, this.pacientes.lista[i].apellido,
                        this.pacientes.lista[i].telefono, this.pacientes.lista[i].email, this.pacientes.lista[i].ruc,
                        this.pacientes.lista[i].cedula, this.pacientes.lista[i].tipoPersona, this.pacientes.lista[i].fechaNacimiento
                    ]);
            }
            this.dataTable = {
                headerRow: ['Id', 'Nombre', 'Apellido', 'Teléfono', 'Email', 'RUC', 'CI', 'Tipo', 'Fecha de Nacimiento', 'Acciones'],
                footerRow: ['Id', 'Nombre', 'Apellido', 'Teléfono', 'Email', 'RUC', 'CI', 'Tipo', 'Fecha de Nacimiento', 'Acciones'],
                dataRows: array
            };
        });
    }

    onChangeTipoDeBusqueda(value){
        this.filtros.tipo_de_busqueda=value;
    }
    onChangeTipoDePersona(value){
        this.filtros.tipo_de_persona=value;
    }

    buscarPersona(){
        $('#modal_buscar_persona').modal('hide');

        const nombre = $('#busqueda_nombre_persona').val();
        const apellido = $('#busqueda_apellido_persona').val();

        this.getListPacientesSearch(nombre, apellido, this.filtros.tipo_de_busqueda, this.filtros.tipo_de_persona);
    }

    getListPacientesSearch(nombre, apellido, tipo_de_busqueda, tipo_de_persona) {
        this.dataApi.getAllPacientesSearch(nombre, apellido, tipo_de_busqueda, tipo_de_persona).subscribe(pacientes => {
            this.pacientes = pacientes;
            this.cantidadTotalDePersonas = this.pacientes.totalDatos;
            const array = [];
            for (let i = 0; i < this.pacientes.lista.length; i++) {
                array.push(
                    [this.pacientes.lista[i].idPersona, this.pacientes.lista[i].nombre, this.pacientes.lista[i].apellido,
                        this.pacientes.lista[i].telefono, this.pacientes.lista[i].email, this.pacientes.lista[i].ruc,
                        this.pacientes.lista[i].cedula, this.pacientes.lista[i].tipoPersona, this.pacientes.lista[i].fechaNacimiento
                    ]);
            }
            this.dataTable = {
                headerRow: ['Id', 'Nombre', 'Apellido', 'Teléfono', 'Email', 'RUC', 'CI', 'Tipo', 'Fecha de Nacimiento', 'Acciones'],
                footerRow: ['Id', 'Nombre', 'Apellido', 'Teléfono', 'Email', 'RUC', 'CI', 'Tipo', 'Fecha de Nacimiento', 'Acciones'],
                dataRows: array
            };
        });
    }

    openModalEditar(row) {
        $('#nombre_paciente').val(row[1]);
        $('#apellido_paciente').val(row[2]);
        $('#email_paciente').val(row[3]);
        $('#telefono_paciente').val(row[4]);
        $('#ruc_paciente').val(row[5]);
        $('#cedula_paciente').val(row[6]);
        $('#tipo_paciente').val(row[7]);
        $('#fecha_de_nacimiento_paciente').val(row[8]);
        this.editarID = row[0];
        $('#modal_editar_persona').modal('show');
    }

    editarPersona() {
        $('#modal_editar_persona').modal('hide');
        let paciente={};
        paciente = {
            "nombre": $('#nombre_paciente').val(),
            "apellido": $('#apellido_paciente').val(),
            "email": $('#email_paciente').val(),
            "telefono": $('#telefono_paciente').val(),
            "ruc": $('#ruc_paciente').val(),
            "cedula": $('#cedula_paciente').val(),
            "tipoPersona": $('#tipo_paciente').val()
        }

        if($('#fecha_de_nacimiento_paciente').val()!=""){
            paciente={
              ...paciente,
              "fechaNacimiento":  new Date($('#fecha_de_nacimiento_paciente').val()).toISOString().substring(0,10)+" 00:00:00"
            }
          }
        this.dataApi.getPersonaById(this.editarID).subscribe(data => {
            this.personaEditar = data
            if (this.personaEditar != null) {
                this.dataApi.updatePersona(this.personaEditar, paciente).subscribe(data => {
                    $('#editado_exitoso').show();
                    // $('#categoria_descripcion' + this.editarID).html(descripcion);
                    this.getListPacientes(this.filtros);
                    this._router.navigate(['pacientes/listar']);
                },error => {this.editarError = error
                    $('#editar_error').show();
                });
            }
        });
    }

    closeEditarError(){
        $('#editar_error').hide();
    }

    closeEditarSuccess(){
        $('#editado_exitoso').hide();
    }
}





