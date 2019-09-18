import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse , HttpErrorResponse} from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable({
    providedIn: 'root'
})

export class DataApiService {
    public url_api_persona = '/stock-pwfe/persona';
    constructor(private http: HttpClient) {}

    getAllPacientes(filtros: any) {
        const url_api_get_persona = this.url_api_persona + '?orderBy=' + filtros.orderBy + '&orderDir=' + filtros.orderDir + '&inicio=' + filtros.inicio + '&cantidad=' + filtros.cantidad;
        return this.http.get (url_api_get_persona);
    }

    getAllPacientesSearch(nombre, apellido, tipo_de_busqueda, tipo_de_persona) {
        let json;
        let params=new HttpParams();
        let jsonEjemplo={};
        if(tipo_de_persona!=='All'){
            jsonEjemplo = {"soloUsuariosDelSistema": tipo_de_persona === 'Fisioterapeuta' ? true : false}
        }

        if(tipo_de_busqueda === "exacta"){
            if(nombre!=="")
                jsonEjemplo = { ...jsonEjemplo, "nombre": nombre }
            
            if(apellido!=="")
                jsonEjemplo = { ...jsonEjemplo, "apellido": apellido }
            
            json = JSON.stringify(jsonEjemplo);

            if(json!=='{}')
                params= params.set("ejemplo", json);
        }else{
            jsonEjemplo = { ...jsonEjemplo, nombre: nombre , apellido: apellido};
            json = JSON.stringify(jsonEjemplo);
            params = params.set("ejemplo", json).set("like",'S');
        }

        return this.http.get (this.url_api_persona, {params: params});
    }

    addPaciente(paciente: any): Observable < any > {
        const json = JSON.stringify(paciente);
        const url_api_post_persona = '/stock-pwfe/persona';
        return this.http.post < any > (url_api_post_persona, paciente).catch(this.errorHandler);
    }

    deletePersona(idPersona: any): Observable <any> {
        const url_api_delete_persona = '/stock-pwfe/persona/' + idPersona;
        return this.http.delete < any > (url_api_delete_persona).catch(this.errorHandler);
    }

    errorHandler(error: HttpErrorResponse){
        return Observable.throw(error.error || "Server Error");
    }

    getPersonaById(idPersona) {
        const url_api_get_persona = '/stock-pwfe/persona/' + idPersona;
        return this.http.get(url_api_get_persona);
    }

    updatePersona(persona: any, newPersona: any): Observable < any > {
        const url_api_update_persona = '/stock-pwfe/persona';
        const jsonPersona = {
            "idPersona": persona.idPersona,
            "nombre": newPersona.nombre,
            "apellido": newPersona.apellido,
            "email": newPersona.email,
            "telefono": newPersona.telefono,
            "ruc": newPersona.ruc,
            "cedula": newPersona.cedula,
            "fechaNacimiento": newPersona.fechaNacimiento,
            "tipoPersona": persona.tipoPersona,
            "usuarioLogin": persona.usuarioLogin,
            "idLocalDefecto": persona.idLocalDefecto,
            "flagVendedor": persona.flagVendedor,
            "observacion": persona.observacion,
            "tipoCliente": persona.tipoCliente,
            "fechaHoraAprobContrato": persona.fechaHoraAprobContrato,
            "soloUsuariosDelSistema": persona.soloUsuariosDelSistema,
            "nombreCompleto": persona.nombreCompleto,
            "limiteCredito": persona.limiteCredito,
            "soloProximosCumpleanhos": persona.soloProximosCumpleanhos,
            "todosLosCampos": persona.todosLosCampos
        }

        return this.http.put < any > (url_api_update_persona, jsonPersona).catch(this.errorHandler);
    }

}
