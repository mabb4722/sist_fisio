import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FisioterapeutaService {

  url = 'https://gy7228.myfoscam.org:8443/stock-pwfe/';

  constructor(private http: HttpClient) {

  }
  putHorarioExcepcionFisioterapeuta(postquery) {
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'usuario': 'ana '
    });

    const url = this.url + 'horarioExcepcion';

    console.log(postquery);
    return this.http.put(url, postquery, {headers: headers});
  }

  deleteHorarioExcepcionFisioterapeuta(id) {
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'usuario': 'ana'
    });
    const url = this.url + 'horarioExcepcion' + '/' + id.toString();
    return this.http.delete(url, {headers: headers})
  }

  postHorarioExcepcionFisioterapeuta (postquery) {
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'usuario': 'ana '
    });

    const url = this.url + 'horarioExcepcion';
    return this.http.post(url, postquery, {headers: headers});
  }
















  // POST HORARIO DE ATENCION
    postHorarioAtencionFisioterapeuta (postquery) {
      const headers = new HttpHeaders ({
        'Content-Type': 'application/json',
        'usuario': 'ana '
      });
  
      const url = this.url + 'personaHorarioAgenda';
      return this.http.post(url, postquery, {headers: headers});
    }


    deleteHorarioAtencionFisioterapeuta(id) {
      const headers = new HttpHeaders ({
        'Content-Type': 'application/json',
        'usuario': 'ana '
      });
      const url = this.url + 'personaHorarioAgenda' + '/' + id.toString();
      return this.http.delete(url, {headers: headers})


    }


    putHorarioAtencionFisioterapeuta(putquery) {
      const headers = new HttpHeaders ({
        'Content-Type': 'application/json',
        'usuario': 'ana'
      });
      const url = this.url + 'personaHorarioAgenda';
      return this.http.put(url, putquery, {headers: headers});
    }









// Horario de Excepción

cargarFisioterapeutaExcepcion(result?: any) {
  let params = null;
  if (result != null) {
    console.log('hola', result);
    params = new HttpParams().set('ejemplo', JSON.stringify(result.empleado))
                            .set('orderBy', result.orderBy )
                            .set('orderDir', result.order)
                            .set('cantidad', result.cantidad)
                            .set('inicio', result.inicio);
  }

  const headers = new HttpHeaders ({
    'Content-Type': 'application/json',
    'usuario': 'gustavo'
  });

  const url = this.url + 'horarioExcepcion';
  return this.http.get(url, {params: params, headers: headers})
      .pipe( map((data: any) => {
        const listFisio: any[] = [];
        for (const c of data['lista'] ) {
          const horarioFisio = {};
          horarioFisio['idHorarioExcepcion'] = c.idHorarioExcepcion;
          horarioFisio['Empleado'] = c.idEmpleado.nombreCompleto;
          horarioFisio['idEmpleado'] = c.idEmpleado.idPersona;
          horarioFisio['nombrelocal'] = c['idLocal'].nombre;
          horarioFisio['flagEsHabilitar'] = c.flagEsHabilitar;
          const fecha = c.fechaCadena;
          horarioFisio['fecha'] = fecha.substr(0, 4) + '-' + fecha.substr(4, 2) + '-' + fecha.substr(6, 2);
          const horahc = c.horaCierreCadena;
          horarioFisio['horaCierreCadena'] = horahc.substr(0, 2) + ':' + horahc.substr(2, 2);
          const horaap = c.horaAperturaCadena;
          horarioFisio['horaAperturaCadena'] =  horaap.substr(0, 2) + ':' + horaap.substr(2, 2);
          listFisio.push(horarioFisio);
        }
        const totalDatos = data['totalDatos'];
        return  {listFisio: listFisio, totalDatos };
    }));

}







  // Horario de Atención
  cargarFisioterapeutaquery(result?: any) {
    let params = null;
    if (result != null) {
      console.log('hola', result);
      params = new HttpParams().set('ejemplo', JSON.stringify(result.empleado))
                  .set('orderBy', result.orderBy )
                  .set('orderDir', result.order)
                  .set('cantidad', result.cantidad)
                  .set('inicio', result.inicio);

    }

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'usuario': 'gustavo'
    });

    const url = this.url + 'personaHorarioAgenda';
    return this.http.get(url, {params: params, headers: headers})
       .pipe( map((data: any) => {
          const listFisio: any[] = [];
         for (const c of data['lista'] ) {
           const horarioFisio = {};
           horarioFisio['idPersonaHorarioAgenda'] = c.idPersonaHorarioAgenda;
           horarioFisio['Empleado'] = c.idEmpleado.nombreCompleto;
           horarioFisio['idEmpleado'] = c.idEmpleado.idPersona;
           horarioFisio['nombrelocal'] = c['idLocal'].nombre;
           horarioFisio['horaApertura'] = c.horaApertura;
           horarioFisio['horaCierre'] = c.horaCierre;
           horarioFisio['diaCadena'] = c.diaCadena;
           horarioFisio['intervaloMinutos'] = c.intervaloMinutos;
           listFisio.push(horarioFisio);
         }
         const totalDatos = data['totalDatos'];
         return  {listFisio: listFisio, totalDatos };
     }));
   }



   getFisioterapeutaSistema() {
    const url = this.url + 'persona';
    const params = new HttpParams()
    .set('ejemplo', JSON.stringify({'soloUsuariosDelSistema': true}));
    return this.http.get(url, {params: params})
        .pipe( map((data: any) => {
          const listpersonas: any[] = [];
          for (const c of data['lista'] ) {
            const persona = {};
            persona['key'] = c.nombreCompleto;
            persona['value'] = c.idPersona;
            listpersonas.push(persona);
          }
        return  listpersonas;
     }));
  }
}
