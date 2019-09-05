// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import {Component} from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {Router} from '@angular/router';





declare const $: any;

@Component({
    selector: 'app-categorias',
    templateUrl: './agregarcategoria.component.html',
    styleUrls: ['./agregarcategoria.component.css']
})

export class AgregarcategoriaComponent  {
    constructor(private dataApi: DataApiService, private _router: Router) { }
    onAddCategoria() {
        const categoria = $('#descripcion_categoria').val();
        if (categoria != '' && categoria != null) {
            this.dataApi.addCategoria(categoria).subscribe(
                data  => {
                    this._router.navigate(['categorias']);
                    console.log('POST Request is successful ', data);
                });
        }
        console.log(categoria);
    }
}


