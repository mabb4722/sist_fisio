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
     const url_api = 'https://gy7228.myfoscam.org:8443/stock-pwfe/categoria';
    return this.http.get(url_api);
  }
}
