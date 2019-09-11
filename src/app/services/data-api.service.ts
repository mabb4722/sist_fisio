import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  categorias: Observable<any>;
  constructor(private http: HttpClient) { }
  getAllCategorias(filtros:any) {
    const url_api_get_categoria = '/stock-pwfe/categoria?orderBy='+filtros.orderBy+'&orderDir='+filtros.orderDir+'&inicio='+filtros.inicio+'&cantidad='+filtros.cantidad;
    return this.http.get(url_api_get_categoria);
  }
  addCategoria (categoria: any): Observable<any> {
    const url_api_post_categoria = '/stock-pwfe/categoria';
    return this.http.post<any>(url_api_post_categoria, {'descripcion': categoria});
  }
  deleteCategoria (iDcategoria: any): Observable<any> {
    const url_api_delete_categoria = '/stock-pwfe/categoria/' + iDcategoria;
    return this.http.delete<any>(url_api_delete_categoria);
  }
  editCategoria(categoria: any, nueva_descripcion: any): Observable<any> {
    const url_api_edit_categoria = '/stock-pwfe/categoria';
    return this.http.put<any>(url_api_edit_categoria, {'idCategoria': categoria.idCategoria , 'descripcion': nueva_descripcion,
    'flagVisible': categoria.flagVisible, 'posicion': categoria.posicion
    });
  }
  getOneCategoria(idCategoria) {
    const url_api_get_categoria = '/stock-pwfe/categoria/'+idCategoria;
    return this.http.get(url_api_get_categoria);
  }
  getSubcategorias(idCategoria: any): Observable<any> {
    console.log(idCategoria, JSON.stringify(idCategoria));
    const params = new HttpParams().set('ejemplo', JSON.stringify(idCategoria));
    const url_get_subcategorias = '/stock-pwfe/tipoProducto';
    console.log(params);

    return this.http.get(url_get_subcategorias, {params: params});
  }
}
