/*  Servicios para ejercicio 3
    Componente presentacion-producto
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})

export class DataApiService {
    constructor(private http: HttpClient) { }

    url_api_presentacion_producto = '/stock-pwfe/presentacionProducto';

    getAllPresentacionProducto(filtros: any) {
        const params = new HttpParams().set('orderBy', filtros.orderBy).set('orderDir', filtros.orderDir)
                                        .set('inicio', filtros.inicio).set('cantidad', filtros.cantidad)
        return this.http.get (this.url_api_presentacion_producto,{params: params});
    }

    getPresentacionProductoById(idPresentacionProducto) {
        return this.http.get(this.url_api_presentacion_producto+'/'+idPresentacionProducto);
    }

    addPresentacionProducto(presentacionProducto: any): Observable < any > {
        const json = JSON.stringify(presentacionProducto);
        return this.http.post < any > (this.url_api_presentacion_producto, presentacionProducto).catch(this.errorHandler);
    }

    deletePresentacionProducto (idPresentacionProducto: any): Observable<any> {
        return this.http.delete<any>(this.url_api_presentacion_producto +'/'+ idPresentacionProducto).catch(this.errorHandler);
    }

    errorHandler(error: HttpErrorResponse){
        return Observable.throw(error.error || "Server Error");
    }

    updatePresentacionProducto(presentacionProducto: any, newPresentacionProducto: any): Observable < any > {
        const jsonPresentacionProducto = {
            ...presentacionProducto,
            "idPresentacionProducto": presentacionProducto.idPresentacionProducto,
            "codigo":  newPresentacionProducto.codigo,
            "flagServicio":  newPresentacionProducto.flagServicio,
            "idProducto":  {
                "idProducto": newPresentacionProducto.idProducto.idProducto
                },
            "nombre":  newPresentacionProducto.nombre,
            "existenciaProducto": {
                "precioVenta": newPresentacionProducto.precioVenta
                }
            }
        return this.http.put < any > (this.url_api_presentacion_producto, jsonPresentacionProducto).catch(this.errorHandler);
    }

    getPresentacionProductoByIdTipoProducto(filtros: any, idTipoProducto: any){
        const json = {
            "idProducto":{
                "idTipoProducto": {
                    "idTipoProducto": idTipoProducto
                }
            }
        }
        const jsonEjemplo = JSON.stringify(json);

        const params = new HttpParams().set('ejemplo', jsonEjemplo).set('orderBy', filtros.orderBy)
        .set('orderDir', filtros.orderDir).set('inicio', filtros.inicio).set('cantidad', filtros.cantidad);
        return this.http.get (this.url_api_presentacion_producto,{params: params});
    }

    getPresentacionProductoByNombre(filtros: any, nombre: string){
        const json={
            "nombre": nombre
        }
        const jsonEjemplo = JSON.stringify(json);

        const params = new HttpParams().set('ejemplo', jsonEjemplo).set("like",'S').set('orderBy', filtros.orderBy).set('orderDir', filtros.orderDir)
        .set('inicio', filtros.inicio).set('cantidad', filtros.cantidad);

        return this.http.get (this.url_api_presentacion_producto,{params: params});
    }

    getTipoProducto(){
        const url_api_tipoProducto= '/stock-pwfe/tipoProducto';
        const params = new HttpParams().set('orderBy', 'descripcion').set('orderDir', 'asc');
        return this.http.get (url_api_tipoProducto, {params});
    }

    getProductos(){
        const url_api_producto= '/stock-pwfe/producto';
        const params = new HttpParams().set('orderBy', 'idProducto').set('orderDir', 'asc');
        return this.http.get (url_api_producto, {params: params});
    }

    getIdProducto(idTipoProducto: any){
        const url_api_producto = '/stock-pwfe/producto';
        const json = {
            "idTipoProducto": {
                "idTipoProducto": idTipoProducto
            }
        }
        const jsonEjemplo = JSON.stringify(json);

        const params = new HttpParams().set('ejemplo', jsonEjemplo);
        return this.http.get (url_api_producto, { params: params });
    }

    getPrecioVenta(idPresentacionProductoTransient: any){
        const url_api_existenciaProducto = '/stock-pwfe/existenciaProducto';

        const json = {
            "idPresentacionProductoTransient": idPresentacionProductoTransient
        }
        const jsonEjemplo = JSON.stringify(json);

        const params = new HttpParams().set('ejemplo', jsonEjemplo);  
        const headers= new HttpHeaders().set('usuario', 'pedro');
          
        return this.http.get(url_api_existenciaProducto, { headers: headers, params: params })
    }

}