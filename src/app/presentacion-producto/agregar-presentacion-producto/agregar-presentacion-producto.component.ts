import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../services/presentacion-producto/data-api.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-agregar-presentacion-producto',
  templateUrl: './agregar-presentacion-producto.component.html',
  styleUrls: ['./agregar-presentacion-producto.component.css']
})
export class AgregarPresentacionProductoComponent implements OnInit {

  constructor(private dataApi: DataApiService, private _router: Router) { }
  public agregarError
  ngOnInit() {
  }

  onAddPresentacionProducto() {
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
    if (presentacionProducto) {
        this.dataApi.addPresentacionProducto(presentacionProducto).subscribe(
            data  => {
                this._router.navigate(['/presentacion-producto/listar']);
            },
            error => {this.agregarError = error
              $('#agregar_error').show();
            });
    }
  }

  closeAgregarError(){
    $('#agregar_error').hide();
  }

}
