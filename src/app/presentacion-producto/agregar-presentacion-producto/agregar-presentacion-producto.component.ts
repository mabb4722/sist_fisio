import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../services/presentacion-producto/data-api.service';
import {Router} from '@angular/router';

declare const $: any;


@Component({
  selector: 'app-agregar-presentacion-producto',
  templateUrl: './agregar-presentacion-producto.component.html',
  styleUrls: ['./agregar-presentacion-producto.component.css']
})
export class AgregarPresentacionProductoComponent implements OnInit {

  constructor(private dataApi: DataApiService, private _router: Router) { }
  public agregarError;
  public agregarSuccess;
  public serviciosSelect = ['S', 'N'];
  public flagServicio = "N";

  public productos;
  public productosSelect = [];
  public IdProductoCrear;
  public producto;

  ngOnInit() {
    this.dataApi.getProductos().subscribe(productos =>{
      this.productos = productos;
      const array = [];
      for (let i = 0; i < this.productos.lista.length; i++ ) {
          array.push({
            'idProducto':this.productos.lista[i].idProducto, 
            'descripcion':this.productos.lista[i].descripcion 
          }) ;
       }
       this.productosSelect = array;
    });

  }

  flagServicioChange(value){
    this.flagServicio=value;
  }

  IdProductoChange(value){
    this.IdProductoCrear=value;
  }


  onAddPresentacionProducto() {
    const presentacionProducto={
      "codigo":  $('#codigo').val(),
      "flagServicio":  this.flagServicio,
      "idProducto":  {
        "idProducto": this.IdProductoCrear
      },
      "nombre":  $('#nombre').val(),
      "existenciaProducto": {
        "precioVenta": $('#precioVenta').val()
      }
    }
    if (presentacionProducto.codigo && presentacionProducto.idProducto.idProducto) {
        this.dataApi.addPresentacionProducto(presentacionProducto).subscribe(
            data  => {
              this.agregarSuccess=data.idPresentacionProducto;
              $('#agregar_success').show();
            },
            error => {this.agregarError = error
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
