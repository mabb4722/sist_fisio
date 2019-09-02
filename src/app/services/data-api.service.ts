import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  categorias: Observable<any>;
  categoria: Observable<any>;
  constructor(private http: HttpClient) { }
  getAllCategorias() {
     const url_api = '/stock-pwfe/categoria';
    return this.http.get(url_api);
  }
  getAllReservasHoy() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var fechaCadena = yyyy + mm + dd;
    const url_api = '/stock-pwfe/reserva';
    return this.http.get(url_api);
 }
}
