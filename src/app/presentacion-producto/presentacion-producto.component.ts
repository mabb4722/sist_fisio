import {
  Component,
  OnInit
} from '@angular/core';
import {
  DataApiService
} from '../services/presentacion-producto/data-api.service';
import {
  Sort
} from '@angular/material/sort';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-presentacion-producto',
  templateUrl: './presentacion-producto.component.html',
  styleUrls: ['./presentacion-producto.component.css']
})

export class PresentacionProductoComponent implements OnInit {
  public dataTable: DataTable;
  public presentacionProductos: any;
  public cantidadTotalDePresentacionProducto = 0;
  public pageSizeOptions = [5, 10, 25, 100];  
  public eliminarError;
  public editarError;
  public eliminarID;

  public editarID;
  public presentacionProductoEditar;
  public tipoProductos;
  public tipoProductosSelect = [];

  private filtros = {
    orderBy: 'idPresentacionProducto',
    orderDir: 'asc',
    inicio: 0,
    cantidad: 10,
  }

  constructor(private dataApi: DataApiService, private _router: Router) {}

  ngOnInit() {
    this.dataApi.getTipoProducto().subscribe(tipoProductos =>{
      this.tipoProductos = tipoProductos;
      const array = [];
      for (let i = 0; i < this.tipoProductos.lista.length; i++ ) {
          array.push({
            'idTipoProducto':this.tipoProductos.lista[i].idTipoProducto, 
            'descripcion':this.tipoProductos.lista[i].descripcion 
          }) ;
       }
       this.tipoProductosSelect = array;
    });

    this.getListPresentacionProductos(this.filtros);
  }

  sortData(sort: Sort) {
    this.filtros.orderBy = sort.active;
    this.filtros.orderDir = sort.direction;
    this.getListPresentacionProductos(this.filtros);
  }

  paginacion(event) {
    this.filtros.cantidad = event.pageSize;
    this.filtros.inicio = event.pageSize * event.pageIndex;
    this.getListPresentacionProductos(this.filtros);
  }

  filtroTipoProducto(value){
    this.getListPresentacionProductoByIdTipoProducto(this.filtros,value);
  }

  getListPresentacionProductoByIdTipoProducto(filtros, value) {
    this.dataApi.getPresentacionProductoByIdTipoProducto(filtros, value).subscribe(presentacionProductos => {
      this.presentacionProductos = presentacionProductos;
      this.cantidadTotalDePresentacionProducto = this.presentacionProductos.totalDatos;

      const array = [];
      for (let i = 0; i < this.presentacionProductos.lista.length; i++) {
        array.push(
          [this.presentacionProductos.lista[i].idPresentacionProducto,
            this.presentacionProductos.lista[i].nombre,
            this.presentacionProductos.lista[i].descripcion,
            this.presentacionProductos.lista[i].idProducto.idProducto,
            this.presentacionProductos.lista[i].idProducto.idTipoProducto.idTipoProducto
          ]
        );
      }

      this.dataTable = {
        headerRow: ['ID', 'Nombre', 'Descripción', 'ID Producto', 'ID Tipo de Producto', 'Acciones'],
        footerRow: ['ID', 'Nombre', 'Descripción', 'ID Producto', 'ID Tipo de Producto', 'Acciones'],
        dataRows: array
      };

    });
  }

  filtrarNombre(event){
    this.getListPresentacionProductoByNombre(this.filtros, $('#filtNom').val());
  }

  getListPresentacionProductoByNombre(filtros, value) {
    this.dataApi.getPresentacionProductoByNombre(filtros, value).subscribe(presentacionProductos => {
      this.presentacionProductos = presentacionProductos;
      this.cantidadTotalDePresentacionProducto = this.presentacionProductos.totalDatos;

      const array = [];
      for (let i = 0; i < this.presentacionProductos.lista.length; i++) {
        array.push(
          [this.presentacionProductos.lista[i].idPresentacionProducto,
            this.presentacionProductos.lista[i].nombre,
            this.presentacionProductos.lista[i].descripcion,
            this.presentacionProductos.lista[i].idProducto.idProducto,
            this.presentacionProductos.lista[i].idProducto.idTipoProducto.idTipoProducto
          ]
        );
      }

      this.dataTable = {
        headerRow: ['ID', 'Nombre', 'Descripción', 'ID Producto', 'ID Tipo de Producto', 'Acciones'],
        footerRow: ['ID', 'Nombre', 'Descripción', 'ID Producto', 'ID Tipo de Producto', 'Acciones'],
        dataRows: array
      };

    });
  }


  getListPresentacionProductos(filtros) {
    this.dataApi.getAllPresentacionProducto(filtros).subscribe(presentacionProductos => {
      this.presentacionProductos = presentacionProductos;
      this.cantidadTotalDePresentacionProducto = this.presentacionProductos.totalDatos;

      const array = [];
      for (let i = 0; i < this.presentacionProductos.lista.length; i++) {
        array.push(
          [this.presentacionProductos.lista[i].idPresentacionProducto,
            this.presentacionProductos.lista[i].nombre,
            this.presentacionProductos.lista[i].descripcion,
            this.presentacionProductos.lista[i].idProducto.idProducto,
            this.presentacionProductos.lista[i].idProducto.idTipoProducto.idTipoProducto
          ]
        );
      }
      this.dataTable = {
        headerRow: ['ID', 'Nombre', 'Descripción', 'ID Producto', 'ID Tipo de Producto', 'Acciones'],
        footerRow: ['ID', 'Nombre', 'Descripción', 'ID Producto', 'ID Tipo de Producto', 'Acciones'],
        dataRows: array
      };

    });
  }

  openEliminarModal(id) {
    $('#id_presentacion_producto').html(id);
    this.eliminarID = id;
    $('#modal_eliminar_presentacion_producto').modal('show');
  }


  eliminarPresentacionProducto() {
    $('#modal_eliminar_presentacion_producto').modal('hide');
    this.dataApi.deletePresentacionProducto(this.eliminarID).subscribe(data => {
        this.presentacionProductos.lista = this.presentacionProductos.lista.filter(item => item.idPresentacionProducto !== this.eliminarID);
        $('#eliminar_success').show();
        this.getListPresentacionProductos(this.filtros);
        this._router.navigate(['presentacion-producto/listar']);
    },
    error => {this.eliminarError = error
        $('#eliminar_error').show();
    });
  }

  closeEliminarError(){
    $('#eliminar_error').hide();
  }

  closeEliminarSuccess(){
    $('#eliminar_success').hide();
  }

  closeEditarError(){
    $('#editar_error').hide();
  }

  closeEditarSuccess(){
    $('#editar_success').hide();
  }


  openModalEditar(row) {
    this.dataApi.getPresentacionProductoById(row[0]).subscribe(data => {
      this.presentacionProductoEditar = data;
      $('#codigo').val(this.presentacionProductoEditar.codigo);
      $('#flagServicio').val(this.presentacionProductoEditar.flagServicio);
      $('#idProducto').val(this.presentacionProductoEditar.idProducto.idProducto);
      $('#nombre').val(this.presentacionProductoEditar.nombre);
      this.presentacionProductoEditar.existenciaProducto && $('#precioVenta').val(this.presentacionProductoEditar.existenciaProducto.precioVenta);
    }); 
    this.editarID = row[0];
    $('#modal_editar_presentacion_producto').modal('show');
}

  editarPresentacionProducto() {
      $('#modal_editar_presentacion_producto').modal('hide');
      const presentacionProducto={
        "codigo":  $('#codigo').val(),
        "flagServicio":  $('#flagServicio').val(),
        "idProducto":  {
          "idProducto": $('#idProducto').val()
        },
        "nombre":  $('#nombre').val(),
        "existenciaProducto": {
          "precioVenta": $('#precioVenta').val()
        }
      }
      this.dataApi.getPresentacionProductoById(this.editarID).subscribe(data => {
          this.presentacionProductoEditar = data
          if (this.presentacionProductoEditar != null) {
              this.dataApi.updatePresentacionProducto(this.presentacionProductoEditar, presentacionProducto).subscribe(data => {
                  $('#editar_success').show();
                  // $('#categoria_descripcion' + this.editarID).html(descripcion);
                  this.getListPresentacionProductos(this.filtros);
                  this._router.navigate(['presentacion-producto/listar']);
              });
          }
      },
      error => {
        this.editarError = error;
        $('#editar_error').show();
        });
  }


}
