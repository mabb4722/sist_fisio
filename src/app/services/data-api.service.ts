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

  getAllSubcategorias(filtros:any): Observable<any> {
    const params = new HttpParams().set('ejemplo', JSON.stringify(filtros.ejemplo))
                                  .set('orderBy',filtros.orderBy)
                                  .set('orderDir',filtros.orderDir)
                                  .set('inicio',filtros.inicio)
                                  .set('cantidad',filtros.cantidad)
                                  .set('like', filtros.like)
                                    ;
    console.log(params);
    const url_get_subcategorias = '/stock-pwfe/tipoProducto';
    return this.http.get(url_get_subcategorias,{params: params});
  }
  getCategorias(){
    const url_api_get_categoria = '/stock-pwfe/categoria?orderBy=descripcion&orderDir=asc';
    return this.http.get(url_api_get_categoria);
  }
  addSubCategorias(form){
    const url_api_post_sub_categoria = '/stock-pwfe/tipoProducto';
    const body={
      "idCategoria":{
      "idCategoria": form.idCategoria
      },
      "descripcion":form.descripcion
      };
      console.log('body',body);
    return this.http.post(url_api_post_sub_categoria,body);
  }
  editSubCategoria(form:any){
    // const data ={
    //   "idTipoProducto": form.idTipoProducto,
    //   "descripcion": form.descripcion,
    //   "flagVisible": form.flagVisible,
    //   "idCategoria": {
    //       "idCategoria": form.idCategoria,
    //       "descripcion": form.descripcion_cat,
    //       "flagVisible": form.flagVisible_cat,
    //       "posicion": form.posicion_catt
    //   },
    //   "posicion": form.posicion
    // };
    const url_put_sub_cat= '/stock-pwfe/tipoProducto';
    return this.http.put(url_put_sub_cat,form);
  }
  getOneSubCategoria(iDSubcategoria) {
    const url_api_get_sub_categoria = '/stock-pwfe/tipoProducto/' + iDSubcategoria;
    return this.http.get(url_api_get_sub_categoria);
  }
  deleteSubCategoria (iDSubcategoria: any): Observable<any> {
    const url_api_delete_sub_categoria = '/stock-pwfe/tipoProducto/' + iDSubcategoria;
    console.log(url_api_delete_sub_categoria);
    
    // const httpOptions= {
    //   headers: new HttpHeaders({
    //     'Content-Type':'application/json',
    //     'usuario':'gustavo'
    //   })
    // };
    return this.http.delete(url_api_delete_sub_categoria);
  }
  getUsuariosLogin(){
    const url_usuarios = 'stock-pwfe/persona';
    const params = new HttpParams().set('ejemplo',JSON.stringify({soloUsuariosDelSistema:true}));
    return this.http.get(url_usuarios,{params:params});
  }
  getTotalReservas(){
    const url= 'stock-pwfe/reserva';
    return this.http.get(url);
  }
  getTotalPacientes(){
    const url= 'stock-pwfe/persona';
    const params = new HttpParams().set('ejemplo',JSON.stringify({soloUsuariosDelSistema:false}));
    return this.http.get(url,{params:params});
  }

  getAllServiciosReporte(){
    // let params = new HttpParams().set('ejemplo',JSON.stringify({"idFichaClinica":{"idFichaClinica":ficha}}))
    const url_api_get_servicio = '/stock-pwfe/servicio';
    return this.http.get(url_api_get_servicio);
  }
  getallDetalleServicio(servicio){
    const url_api_get_detalle = '/stock-pwfe/servicio/'+servicio+'/detalle';
    return this.http.get(url_api_get_detalle);
  }
  getpresentacionprecio(pres){
    const url_api_get_presentacion = '/stock-pwfe/existenciaProducto';
    let params = new HttpParams().set('ejemplo',JSON.stringify({idPresentacionProductoTransient:pres}));
    let headers = new HttpHeaders().set('usuario', 'pedro');
    return this.http.get(url_api_get_presentacion,{headers,params});
  }
  ///////////////////////////Agregado por Alejandro////////////////////////////////
  getAllempleados() {
    let params = new HttpParams().set('ejemplo',JSON.stringify({"soloUsuariosDelSistema":true}))
    const url_api_get_fichaClinica = '/stock-pwfe/persona';
    return this.http.get(url_api_get_fichaClinica,{params:params});
  }
  getAllpacientes() {
    let params = new HttpParams().set('ejemplo',JSON.stringify({"soloUsuariosDelSistema":false}))
    const url_api_get_fichaClinica = '/stock-pwfe/persona';
    return this.http.get(url_api_get_fichaClinica,{params:params});
  }
  getProductos(categoria){
    let params;
    params = new HttpParams().set('ejemplo',JSON.stringify({idCategoria:{idCategoria: categoria}}));
    const url_api_get_producto = '/stock-pwfe/tipoProducto';
    return this.http.get(url_api_get_producto,{params:params});
  }
  getserviciosFiltro(desdefiltro,hastafiltro,pacientefiltro,fisiofiltro,subcategoria) {   
    let params;
    var dat = {fechaDesdeCadena:desdefiltro,fechaHastaCadena:hastafiltro,
               idFichaClinica:{idCliente:{idPersona:pacientefiltro},idTipoProducto:{idTipoProducto:subcategoria}},               
               idEmpleado:{idPersona:fisiofiltro}}            
    params = new HttpParams().set('ejemplo',JSON.stringify(dat))
    const url_api_get_servicio = '/stock-pwfe/servicio';
    return this.http.get(url_api_get_servicio,{params});
  }
  getEmpleadosFiltrado(filtro, buscarEmpleadoText){
    const url_api = '/stock-pwfe/persona';
    let params;
    if (filtro && buscarEmpleadoText){
      if (filtro == "cedula"){
        params = new HttpParams().set('ejemplo', JSON.stringify({cedula:buscarEmpleadoText}));
      } else if (filtro == "nombre"){
        params = new HttpParams().set('ejemplo', JSON.stringify({nombre:buscarEmpleadoText}));
      } else {
        params = new HttpParams().set('ejemplo', JSON.stringify({apellido:buscarEmpleadoText}));
      }
    }
      const headers = new HttpHeaders ({
        'Content-Type': 'application/json'
      });
    return this.http.get(url_api, {params: params, headers: headers});
   }
   getClientesFiltrado(filtro, buscarClienteText){
    const url_api = '/stock-pwfe/persona';
    let params;
    if (filtro && buscarClienteText){
      if (filtro == "cedula"){
        params = new HttpParams().set('ejemplo', JSON.stringify({cedula:buscarClienteText}));
      } else if (filtro == "nombre"){
        params = new HttpParams().set('ejemplo', JSON.stringify({nombre:buscarClienteText}));
      } else {
        params = new HttpParams().set('ejemplo', JSON.stringify({apellido:buscarClienteText}));
      }
    }
      const headers = new HttpHeaders ({
        'Content-Type': 'application/json'
      });
    return this.http.get(url_api, {params: params, headers: headers});
   }
   getAllpersonas() {
    const url_api_get_fichaClinica = '/stock-pwfe/persona';
    return this.http.get(url_api_get_fichaClinica);
   }
  
}
