// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import {Component, OnInit} from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';





declare const $: any;

@Component({
    selector: 'app-categorias',
    templateUrl: './agregarcategoria.component.html',
    styleUrls: ['./agregarcategoria.component.css']
})

export class AgregarcategoriaComponent implements OnInit {
    constructor(private dataApi: DataApiService, private _router: Router) { }
    ngOnInit() {
        $('.navbar-brand').html('Agregar Categoria');
    }
    
    onAddCategoria() {
        const categoria = $('#descripcion_categoria').val();
        if (categoria != '' && categoria != null) {
            this.dataApi.addCategoria(categoria).subscribe(
                data  => {
                    console.log('#/categorias/categorias_list');
                    this._router.navigate(['/categorias/categorias_list']);
                    swal(
                        {
                          title: 'Categoría creada!',
                          text: 'Categoría creada con éxito!',
                          type: 'success',
                          confirmButtonClass: "btn btn-success",
                          buttonsStyling: false
                        }
                      )
                    
                });
        }
    }
}


