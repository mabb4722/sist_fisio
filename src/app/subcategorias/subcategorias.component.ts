import { Component, OnInit } from '@angular/core';
import { PageEvent, Sort } from '@angular/material';
import { DataApiService } from '../services/data-api.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {FormControl, Validators,ReactiveFormsModule,FormsModule,} from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css']
})
export class SubcategoriasComponent implements OnInit {
  footerRow: string[];
  headerRow: string[];
  dataRows: string[][];
  categorias: any;
  subcategorias:any;
  eliminarID: any;
  editarID: any;
  subcategoriaEditar: any;
  pageEvent: PageEvent;
  categoriasSelect=[];
  selectControl = false;
  constructor(private dataApi:DataApiService, private _router: Router) { }
  private filtros = {
    orderBy: 'idTipoProducto',
    orderDir: 'asc',
    inicio: 0,
    cantidad: 10,
    ejemplo: {idCategoria:{idCategoria: null}}
};
private form = {
  descripcion: null,
  idCategoria: null
}
 form_edit={
  "idTipoProducto": null,
  "descripcion": null,
  "flagVisible": null,
  "idCategoria": {
      "idCategoria": null,
      "descripcion": null,
      "flagVisible": null,
      "posicion": null
  },
  "posicion": null
};
new_cat= null;
selectedValueEdit=null;

  ngOnInit() {
    this.headerRow= [ 'ID', 'Descripción', 'Categoria' ];
    this.footerRow= [ 'ID', 'Descripción', 'Categoria' ];
    this.dataApi.getCategorias().subscribe(categorias =>{
      this.categorias = categorias;
      const array = [];
      for (let i = 0; i < this.categorias.lista.length; i++ ) {
          array.push({
            'idCategoria':this.categorias.lista[i].idCategoria, 
            'descripcion':this.categorias.lista[i].descripcion 
          }) ;
       }
       this.categoriasSelect = array
       console.log('select',this.categoriasSelect);
    });
    
    this.getListSubCategorias();
  }
  getListSubCategorias(){
    this.dataApi.getAllSubcategorias(this.filtros).subscribe(subcategorias => {
      this.subcategorias = subcategorias;
      const array = [];
      for (let i = 0; i < this.subcategorias.lista.length; i++ ) {
          array.push([this.subcategorias.lista[i].idTipoProducto, this.subcategorias.lista[i].descripcion,this.subcategorias.lista[i].idCategoria.descripcion ]) ;
      }
      this.dataRows= array
    } );
  }
  sortData(sort: Sort) {
    this.filtros.orderBy=sort.active;
    this.filtros.orderDir =sort.direction;
    this.getListSubCategorias();        
  }
  paginacion(event){
    this.filtros.cantidad = event.pageSize
    this.filtros.inicio = event.pageSize * event.pageIndex
    this.getListSubCategorias();  
  }

  delete(eliminarID){
    swal({
      title: 'Está seguro que desea eliminar esta sub-categoría?',
      text: 'No podrás recuperarla una vez eliminada!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false
  }).then((result) => {
    if (result.value) {
      const vm= this;
      this.dataApi.deleteSubCategoria(eliminarID).subscribe(data => {
        vm.getListSubCategorias();
        swal({
          title: 'Sub Categoría eliminada!',
          text: 'La sub-categoría ha sido eliminada con éxito!',
          type: 'success',
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false
        }).catch(swal.noop);
      });
      
    }
    
  })
  }
  addSubCategoria(){
    this.form={
      descripcion : $('#descripcion_sub_categoria').val(),
      idCategoria : $('#idCategoria').val()
    };
    console.log('form',this.form);
    if (this.form.descripcion == "" || this.form.descripcion == null ||this.form.idCategoria == "" ||this.form.idCategoria == null) {
      $('#selectControlerror').show();
    } else {
      $('#selectControlerror').hide();
      this.dataApi.addSubCategorias(this.form).subscribe(response=>{
        $('#modal_agregar_sub_categoria').modal('hide');
        swal({
          title: 'Sub Categoría creada!',
          text: 'La sub-categoría ha sido creada con éxito!',
          type: 'success',
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false
        }).catch(swal.noop);
      });
    }
    
  }

  edit(idTipoProducto){
    
    this.dataApi.getOneSubCategoria(idTipoProducto).subscribe(array=>{
      this.editarID = array;
      this.form_edit={
        "idTipoProducto": this.editarID.idTipoProducto,
        "descripcion": this.editarID.descripcion,
        "flagVisible": this.editarID.flagVisible,
        "idCategoria": {
            "idCategoria": this.editarID.idCategoria.idCategoria,
            "descripcion": this.editarID.idCategoria.descripcion,
            "flagVisible": this.editarID.idCategoria.flagVisible,
            "posicion": this.editarID.idCategoria.posicion
        },
        "posicion": this.editarID.posicion
      };
      $('#modal_editar_sub_categoria').modal('show');
      this.selectedValueEdit = this.editarID.idCategoria.idCategoria;
    });
    

    
  }
  putSubCategoria(){
    const new_id_cat= $('#idCategoriaEdit').val();
    const new_descrip = $('#descripcion_sub_categoria_edit').val();
    if (new_id_cat==""|| new_descrip=="") {
      $('#selectControlerrorEdit').show();
    } else {
      $('#selectControlerrorEdit').hide();
      if (this.form_edit.descripcion != new_descrip) {
        this.form_edit.descripcion = new_descrip;
      }
      if (this.form_edit.idCategoria!= new_id_cat) {
        this.dataApi.getOneCategoria(new_id_cat).subscribe(new_cat=>{
          this.new_cat= new_cat;
          console.log('one cat',this.new_cat);
          this.form_edit.idCategoria.idCategoria = this.new_cat.idCategoria;
          this.form_edit.idCategoria.descripcion= this.new_cat.descripcion;
          this.form_edit.idCategoria.flagVisible= this.new_cat.flagVisible;
          this.form_edit.idCategoria.posicion= this.new_cat.posicion;
          const vm = this;
      this.dataApi.editSubCategoria(this.form_edit).subscribe(response=>{
        
        $('#modal_editar_sub_categoria').modal('hide');
        swal({
          title: 'Sub Categoría editada!',
          text: 'La sub-categoría ha sido editada con éxito!',
          type: 'success',
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false
        }).catch(swal.noop);
        vm.getListSubCategorias();
        console.log('response put',response);
      });
        });
      }
     
      
    }
  }

}
