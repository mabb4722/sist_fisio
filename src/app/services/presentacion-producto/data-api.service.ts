/*  Servicios para ejercicio 3
    Componente presentacion-producto
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataApiService {
    constructor(private http: HttpClient) { }

    url_api_presentacion_producto = '/stock-pwfe/presentacionProducto';

    getAllPresentacionProducto(){
        return this.http.get(this.url_api_presentacion_producto);
    }

    getPersonaById(idPresentacionProducto: any) {
        return this.http.get<any>(this.url_api_presentacion_producto + idPresentacionProducto);
    }

    deletePresentacionProducto (idPresentacionProducto: any): Observable<any> {
        return this.http.delete<any>(this.url_api_presentacion_producto + idPresentacionProducto);
    }
}