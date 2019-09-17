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
  getAllReservasHoy() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var fechaCadenaHoy = yyyy + mm + dd;
    const url_api = '/stock-pwfe/reserva';
    let params = new HttpParams().set('ejemplo', JSON.stringify({fechaCadena:fechaCadenaHoy}));
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });
    return this.http.get(url_api, {params: params, headers: headers});
 }
 getReservasFiltrado(fechaDesdeCadena, fechaHastaCadena, empleado, cliente){
  console.log("fechaDesdeCadena", fechaDesdeCadena);
  console.log("fechaHastaCadena", fechaHastaCadena);
  console.log("empleado", empleado);
  console.log("cliente", cliente);
  const url_api = '/stock-pwfe/reserva';
  const headers = new HttpHeaders ({
    'Content-Type': 'application/json'
  });
  var objParams:any = {};
  if (fechaDesdeCadena){
    objParams.fechaDesdeCadena = fechaDesdeCadena;
  }
  if (fechaHastaCadena){
    objParams.fechaHastaCadena = fechaHastaCadena;
  }
  if (empleado){
    objParams.idEmpleado = {idPersona:empleado.idPersona};
  }
  if (cliente){
    objParams.idCliente = {idPersona:cliente.idPersona};
  }
  console.log("objParams", objParams);
  let params = new HttpParams().set('ejemplo', JSON.stringify(objParams));
  return this.http.get(url_api, {params: params, headers: headers});
 }

putObservacionReserva(observacionEditada, aEditar){
  const url_api = '/stock-pwfe/reserva';
  var objParams:any = {};
  objParams.idReserva = aEditar.idReserva;
  objParams.observacion = observacionEditada;
  console.log("put reserva",objParams);
  //let params = new HttpParams().set('ejemplo', JSON.stringify(objParams));
  const headers = new HttpHeaders ({
    'Content-Type': 'application/json'
  });
  return this.http.put(url_api, JSON.stringify(objParams), {headers: headers});
  //return this.http.put(url_api, params, {headers: headers});
}

putAsistio(asistio, aEditar){
  console.log("putAsistio", aEditar, " ", asistio);
  const url_api = '/stock-pwfe/reserva';
  var objParams:any = {};
  objParams.idReserva = aEditar.idReserva;
  if (asistio){
    objParams.flagAsistio = 'S';
  } else {
    objParams.flagAsistio = 'N';
  }
  const headers = new HttpHeaders ({
    'Content-Type': 'application/json'
  });
  return this.http.put(url_api, JSON.stringify(objParams), {headers: headers});
}

deleteReserva(aEditar){
  const url_api = '/stock-pwfe/reserva/' + aEditar.idReserva;
  return this.http.delete(url_api);
}

 //falta verificar si es cliente
 getClientes(){
  const url_api = '/stock-pwfe/persona';
  return this.http.get(url_api);
 }
 getAgendasParaReservas(fecha, disponible, idEmpleado){
  const url_api = '/stock-pwfe/persona/' + idEmpleado.idPersona + '/agenda';
  //const url_api = '/stock-pwfe/persona/' + '4' + '/agenda';
  let params : any;
  params = new HttpParams().set('fecha', fecha).set('disponible',disponible);
  console.log("s");
  return this.http.get(url_api, {params: params});
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

 postReserva(fechaCadena, horaInicioCadena, horaFinCadena, idEmpleado, idCliente){
  const url_api = '/stock-pwfe/reserva';
  /*const headers = new HttpHeaders ({
    'Content-Type': 'application/json',
    'usuario': 'gustavo'
  });*/
  const headers = new HttpHeaders().set('Content-Type', 'application/json').set('usuario','ana');
  var objParams:any = {};
  objParams.fechaCadena = fechaCadena;
  objParams.horaInicioCadena = horaInicioCadena;
  objParams.horaFinCadena = horaFinCadena;
  objParams.idEmpleado = {idPersona: idEmpleado};
  objParams.idCliente = {idPersona: idCliente};
  console.log("OBJPARAMS", objParams);
  return this.http.post(url_api, JSON.stringify(objParams), {headers: headers});
 }

 //falta verificar si es empleado
 getEmpleados(){
  const url_api = '/stock-pwfe/persona';
  let params = new HttpParams().set('ejemplo', JSON.stringify({soloUsuariosDelSistema:'true'}));;
  return this.http.get(url_api, {params: params});
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

}
