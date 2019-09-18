import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import {DataApiService} from '../../services/data-api.service';
import {Categoria} from '../../categoria';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-regular-table-cmp',
    templateUrl: 'regulartable.component.html'
})

export class RegularTableComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;
    public tableData3: TableData;
    constructor(private dataApi: DataApiService) { }
    categorias: any;

    ngOnInit() {
        this.getListCategorias();
        /**this.tableData1 = {
            headerRow: [ 'id', this.categorias],
            dataRows: [
                ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout' ],
                ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
                ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
                ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
                ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
                ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
            ]
         };
         this.tableData2 = {
             headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
             dataRows: [
                 ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout' ],
                 ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
                 ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
                 ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
                 ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
                 ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
             ]
          };
          this.tableData3 = {
              headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
              dataRows: [
                  ['1', 'Dakota Rice (Success)', '$36,738', 'Niger', 'Oud-Turnhout' ],
                  ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
                  ['3', 'Sage Rodriguez (Info)', '$56,142', 'Netherlands', 'Baileux' ],
                  ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
                  ['5', 'Doris Greene (Danger)', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
                  ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ],
                  ['7', 'Mike Chaney (Warning)', '$38,735', 'Romania', 'Bucharest' ]
              ]
           }; */
    }
    getListCategorias() {
        // this.dataApi.getAllCategorias().subscribe(categorias => {
        //     this.categorias = categorias;
        //     console.log("categorias", categorias);
        //     console.log("this.categorias", this.categorias.totalDatos);
        // } );
    }
}
