import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json', 
    'usuario' :'pedro'
  })
};

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

  getProductos(categoria){
    let params;
    params = new HttpParams().set('ejemplo',JSON.stringify({idCategoria:{idCategoria: categoria}}));
    const url_api_get_producto = '/stock-pwfe/tipoProducto';
    return this.http.get(url_api_get_producto,{params:params});
  }

  getAllfichaClinicas(fisiofiltro,pacientefiltro,desdefiltro,hastafiltro,producto) {   
    let params;
    var dat = {fechaDesdeCadena:desdefiltro,fechaHastaCadena:hastafiltro,
               idCliente:{idPersona:pacientefiltro},
               idEmpleado:{idPersona:fisiofiltro},
               idTipoProducto:{idTipoProducto:producto}}            

    params = new HttpParams().set('ejemplo',JSON.stringify(dat))
    console.log(params);
    const url_api_get_fichaClinica = '/stock-pwfe/fichaClinica';
    return this.http.get(url_api_get_fichaClinica,{params:params});
  } 
  getAllpersonas() {
    const url_api_get_fichaClinica = '/stock-pwfe/persona';
    return this.http.get(url_api_get_fichaClinica);
  }
  getAllpacientes() {
    let params = new HttpParams().set('ejemplo',JSON.stringify({"soloUsuariosDelSistema":false}))
    const url_api_get_fichaClinica = '/stock-pwfe/persona';
    return this.http.get(url_api_get_fichaClinica,{params:params});
  }
  getAllempleados() {
    let params = new HttpParams().set('ejemplo',JSON.stringify({"soloUsuariosDelSistema":true}))
    const url_api_get_fichaClinica = '/stock-pwfe/persona';
    return this.http.get(url_api_get_fichaClinica,{params:params});
  }
  getAlltipoProducto() {
    const url_api_get_fichaClinica = '/stock-pwfe/tipoProducto';
    return this.http.get(url_api_get_fichaClinica);
  }
  getAllServiciosFicha(ficha){
    let params = new HttpParams().set('ejemplo',JSON.stringify({"idFichaClinica":{"idFichaClinica":ficha}}))
    const url_api_get_servicio = '/stock-pwfe/servicio';
    return this.http.get(url_api_get_servicio,{params:params});
  }
  addfichaClinicas (diagnostico,motivo,observacion,fisioterapeuta,
    paciente, tipoProducto){
    let params = null;
    const url_api_post_fichaClinica = '/stock-pwfe/fichaClinica';
    return this.http.post<any>(url_api_post_fichaClinica, 
      {
        "motivoConsulta": motivo,
        "diagnostico":diagnostico,
        "observacion":observacion,
        "idEmpleado":{
          "idPersona":fisioterapeuta
        },
        "idCliente":{
          "idPersona":paciente
        },
        "idTipoProducto": {      
          "idTipoProducto":tipoProducto   
        }
      },httpOptions);
  }
  deletefichaClinica(ficha){
    const url_api_delete_fichaClinica = '/stock-pwfe/fichaClinica'+'/'+ficha;
    return this.http.delete(url_api_delete_fichaClinica)
  }
  modificarfichaClinica(obs,fila){
    const url_api_put_fichaClinica = '/stock-pwfe/fichaClinica';
    return this.http.put(url_api_put_fichaClinica,
      {
        "idFichaClinica":fila.idFichaClinica,
        "observacion":obs
      },httpOptions
      );  
  }
  addCategoria (categoria: any): Observable<any> {
    const url_api_post_categoria = '/stock-pwfe/categoria';
    return this.http.post<any>(url_api_post_categoria, {'descripcion': categoria});
  }
  getAllservicios(desdefiltro,hastafiltro,pacientefiltro,fisiofiltro,subcategoria) {   
    let params;
    var dat = {fechaDesdeCadena:desdefiltro,fechaHastaCadena:hastafiltro,
               idFichaClinica:{idCliente:{idPersona:pacientefiltro},idTipoProducto:{idTipoProducto:subcategoria}},               
               idEmpleado:{idPersona:fisiofiltro}}            

    params = new HttpParams().set('ejemplo',JSON.stringify(dat))
    const url_api_get_servicio = '/stock-pwfe/servicio';
    return this.http.get(url_api_get_servicio,{params});
  }
  addServicio (observacion, ficha){
    const url_api_post_servicio = '/stock-pwfe/servicio';
    return this.http.post<any>(url_api_post_servicio, 
      {"idFichaClinica": {"idFichaClinica":ficha},"observacion":observacion},httpOptions);
  }
  deleteDetalleServicio(servicio,detalle){
    const url_api_delete_DetalleServicio = '/stock-pwfe/servicio'+'/'+servicio+'/detalle'+'/'+detalle;
    console.log(url_api_delete_DetalleServicio);
    return this.http.delete(url_api_delete_DetalleServicio)
  }
  getallPresentacionProducto(){
    const url_api_get_presentacion = '/stock-pwfe/presentacionProducto';
    return this.http.get(url_api_get_presentacion);
  }
  addDetalle(servicio,presentacion,cantidad){
    const url_api_post_detalle = '/stock-pwfe/servicio/'+servicio+'/detalle'
    return this.http.post(url_api_post_detalle,
      {
        "cantidad": cantidad,
        "idPresentacionProducto":{
          "idPresentacionProducto":presentacion
        },
        "idServicio":{
          "idServicio":servicio
        }
      },httpOptions)
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
  getFichaUnico(idFichaClinica){
    const url_api_get_fichaClinica = '/stock-pwfe/fichaClinica/'+idFichaClinica;
    return this.http.get(url_api_get_fichaClinica);
  }
  modificarServicio (observacion, ficha){
    const url_api_post_servicio = '/stock-pwfe/servicio';
    return this.http.put<any>(url_api_post_servicio, 
      {"idFichaClinica": {"idFichaClinica":ficha},"observacion":observacion},httpOptions);
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
  
}