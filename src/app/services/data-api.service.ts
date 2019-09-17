import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
