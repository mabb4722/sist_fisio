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
  getAllPresentacionProducto() {
    const url_api_get_presentacion_producto = '/stock-pwfe/presentacionProducto';
    return this.http.get(url_api_get_presentacion_producto);
  }
  getAllPacientes() {
    const url_api_get_persona = '/stock-pwfe/persona';
    return this.http.get(url_api_get_persona);
  }
  addPaciente (paciente: any): Observable<any> {
    const json = JSON.stringify(paciente);            
    console.log(json);
    const url_api_post_persona = '/stock-pwfe/persona';
    return this.http.post<any>(url_api_post_persona, paciente);
  }
  deletePersona (idPersona: any): Observable<any> {
    const url_api_delete_persona = '/stock-pwfe/persona/' + idPersona;
    return this.http.delete<any>(url_api_delete_persona);
  }

  updatePersona(){
    
  }


}
