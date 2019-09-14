import {Component, OnInit, AfterViewInit,   AfterViewChecked} from '@angular/core';
import {DataApiService} from '../services/data-api.service';
import {Router} from '@angular/router';


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

export class PacientesComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public dataTable: DataTable;
  
  constructor(private dataApi: DataApiService, private _router: Router) { }
  pacientes: any;
  eliminarID: any;

  bandera : boolean;

  ngOnInit() {
      this.getListPacientes();
      this.bandera = false;
  }

openModal(id, nombre, apellido, ci) {
    $('#nombre_persona').html(nombre);
    $('#apellido_persona').html(apellido);
    $('#ci_persona').html(ci);

    this.eliminarID = id;
    $('#modal_eliminar_persona').modal('show');
}
eliminarPersona() {
    $('#modal_eliminar_persona').modal('hide');
    this.dataApi.deletePersona(this.eliminarID).subscribe(data  => {
        this.pacientes.lista = this.pacientes.lista.filter(item => item.idPersona !== this.eliminarID);
        $('#eliminado_exitoso').show();
        this.getListPacientes();
        this._router.navigate(['pacientes/listar']);
    });
}


  ngAfterViewInit() {

  }
  ngAfterViewChecked()  {
      if (this.pacientes && !this.bandera ){
          this.bandera = true;
          $('#datatables').DataTable({
              "pagingType": "full_numbers",
              "lengthMenu": [
                  [10, 25, 50, -1],
                  [10, 25, 50, "All"]
              ],
              responsive: true,
              language: {
                  search: "_INPUT_",
                  searchPlaceholder: "Search records",
              }

          });

          const table = $('#datatables').DataTable();

          // Edit record
          table.on('click', '.edit', function(e) {
              let $tr = $(this).closest('tr');
              if ($($tr).hasClass('child')) {
                  $tr = $tr.prev('.parent');
              }

              var data = table.row($tr).data();
              alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
              e.preventDefault();
          });

          // Delete a record
          table.on('click', '.remove', function(e) {
              const $tr = $(this).closest('tr');
              table.row($tr).remove().draw();
              e.preventDefault();
          });

          //Like record
          table.on('click', '.like', function(e) {
              alert('You clicked on Like button');
              e.preventDefault();
          });

          $('.card .material-datatables label').addClass('form-group');

      }
  }

  getListPacientes() {
      this.dataApi.getAllPacientes().subscribe(pacientes => {
          this.pacientes = pacientes;
          const array = [];
          for (let i = 0; i < this.pacientes.lista.length; i++ ) {
              array.push(
                [this.pacientes.lista[i].idPersona, this.pacientes.lista[i].nombre, this.pacientes.lista[i].apellido,
                this.pacientes.lista[i].telefono, this.pacientes.lista[i].email, this.pacientes.lista[i].ruc,
                this.pacientes.lista[i].cedula, this.pacientes.lista[i].tipoPersona, this.pacientes.lista[i].fechaNacimiento
               ]);
          }
          this.dataTable = {
              headerRow: [ 'Id', 'Nombre', 'Apellido', 'Teléfono', 'Email', 'RUC', 'CI', 'Tipo', 'Fecha de Nacimiento' ],
              footerRow: [ 'Id', 'Nombre', 'Apellido', 'Teléfono', 'Email', 'RUC', 'CI', 'Tipo', 'Fecha de Nacimiento' ],
              dataRows: array
          };
      } );
  }
}



