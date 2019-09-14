import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../services/data-api.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-presentacion-producto',
  templateUrl: './presentacion-producto.component.html',
  styleUrls: ['./presentacion-producto.component.css']
})
export class PresentacionProductoComponent implements OnInit {
  public dataTable: DataTable;

  constructor(private dataApi: DataApiService) { }
  public presentacionProductos: any;

  ngOnInit() {
    this.getListPresentacionProductos();

    /*this.dataTable = {
        headerRow: [ 'CI', 'Nombre', 'Local', 'Fisioterapeuta', 'Fecha', 'Inicio', 'Fin', 'Estado', 'Asistió' ],
        footerRow: [ 'CI', 'Nombre', 'Local', 'Fisioterapeuta', 'Fecha', 'Inicio', 'Fin', 'Estado', 'Asistió' ],
        dataRows: []
     };*/


  }

  getListPresentacionProductos() {
    this.dataApi.getAllPresentacionProducto().subscribe(presentacionProductos => {
        this.presentacionProductos = presentacionProductos;
        //console.log("presentacionProductos", presentacionProductos);
    });
  }

}
