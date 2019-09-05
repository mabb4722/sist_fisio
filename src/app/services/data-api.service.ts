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
    const url_api_get_categoria = '/stock-pwfe/categoria';
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
}
