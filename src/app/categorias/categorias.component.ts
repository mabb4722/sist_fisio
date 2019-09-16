

import {Component, OnInit} from '@angular/core';
import {DataApiService} from '../services/data-api.service';
import {Router} from '@angular/router';
import { PageEvent } from '@angular/material';
import {Sort} from '@angular/material/sort';
import swal from 'sweetalert2';

// declare interface DataTable {
//     headerRow: string[];
//     footerRow: string[];
//     dataRows: string[][];
// }

declare const $: any;

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.css']
})

export class CategoriasComponent implements OnInit{
    footerRow: string[];
    headerRow: string[];
    dataRows: string[][];
    categorias: any;
    bandera: boolean;
    eliminarID: any;
    editarID: any;
    categoriaEditar: any;
    private count = 0;
    sortedData: any;
    

    pageEvent: PageEvent;
    constructor(private dataApi: DataApiService, private _router: Router) { }

    
    private filtros = {
        orderBy: 'idCategoria',
        orderDir: 'asc',
        inicio: 0,
        cantidad: 10,
    };
    ngOnInit() {
        this.headerRow= [ 'ID', 'Descripción' ];
        this.footerRow= [ 'ID', 'Descripción' ];
        this.getListCategorias();
        this.bandera = false;


    }

    sortData(sort: Sort) {
        this.filtros.orderBy=sort.active;
        this.filtros.orderDir =sort.direction;
        this.getListCategorias();        
     }
     paginacion(event){
        this.filtros.cantidad = event.pageSize
        this.filtros.inicio = event.pageSize * event.pageIndex
        this.getListCategorias();  
    }
    openModal(id, descripcion) {
        $('#descripcion_cat').html(descripcion);
        this.eliminarID = id;
        $('#modal_eliminar_categoria').modal('show');
    }
    eliminarCategoria() {
        $('#modal_eliminar_categoria').modal('hide');
        this.dataApi.deleteCategoria(this.eliminarID).subscribe(data  => {
            this.categorias.lista = this.categorias.lista.filter(item => item.idCategoria !== this.eliminarID);
            // $('#eliminado_exitoso').show();
            swal(
                {
                  title: 'Categoría eliminada!',
                  text: 'Categoría eliminada con éxito!',
                  type: 'success',
                  confirmButtonClass: "btn btn-success",
                  buttonsStyling: false
                }
              )
            this.getListCategorias();
            this._router.navigate(['categorias/categorias_list']);


        });
    }
    openModalEditar(id, descripcion) {
        console.log(descripcion);
        $('#descripcion_categoria').val(descripcion);
        this.editarID = id;
        $('#modal_editar_categoria').modal('show');
    }
    editarCategoria() {
        $('#modal_editar_categoria').modal('hide');
        const descripcion = $('#descripcion_categoria').val();
        console.log('nueva descripcion',descripcion);
        this.dataApi.getOneCategoria(this.editarID).subscribe(data => {
            console.log('get');
                console.log(data);
            this.categoriaEditar = data
            if (this.categoriaEditar != null) {
                this.dataApi.editCategoria(this.categoriaEditar, descripcion).subscribe(data  => {
                    swal(
                        {
                          title: 'Categoría editada!',
                          text: 'Categoría editada con éxito!',
                          type: 'success',
                          confirmButtonClass: "btn btn-success",
                          buttonsStyling: false
                        }
                      )
                    console.log('esta parte');
                    console.log(data);
                    $('#categoria_descripcion' + this.editarID).html(descripcion);
                    this.getListCategorias();
                    this._router.navigate(['categorias/categorias_list']);
                });
            }
        });
       
        
    }
    getListCategorias() {
        this.dataApi.getAllCategorias(this.filtros).subscribe(categorias => {
            this.categorias = categorias;
        
            const array = [];
            for (let i = 0; i < this.categorias.lista.length; i++ ) {
                array.push([this.categorias.lista[i].idCategoria, this.categorias.lista[i].descripcion ]) ;
            }
            this.dataRows= array
        } );
    }

}


