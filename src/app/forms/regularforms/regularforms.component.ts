import { Component } from '@angular/core';
import {DataApiService} from '../../services/data-api.service';

declare var $: any;

@Component({
    selector: 'app-regularforms-cmp',
    templateUrl: 'regularforms.component.html'
})

export class RegularFormsComponent {
    constructor(private dataApi: DataApiService) { }
    onAddCategoria() {
        const categoria = $('#descripcion_categoria').val();
        if (categoria != '' && categoria != null) {
            this.dataApi.addCategoria(categoria).subscribe(
                data  => {
                    console.log('POST Request is successful ', data);
                });
        }
        console.log(categoria);
    }
}
