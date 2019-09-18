import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { DataApiService } from 'src/app/services/data-apia89.service';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
declare const $: any;
@Component({
    selector: 'app-extended-table-cmp',
    templateUrl: 'extendedtable.component.html'
})


export class ExtendedTableComponent implements OnInit {    
    constructor(private dataApi: DataApiService, private _router: Router) { }
    fichaClinica: any;
    pacientes: any;
    fisioterapeutas: any;
    tipoProductos: any;    
    paciente = 1;
    motivo= '';
    diagnostico= '';
    observacion= '';
    fisioterapeuta= 1;
    tipoProducto= 2;
    resultado = '';
    fila:any;
    pacientefiltro="";
    fisioterapeutafiltro="";
    desdefiltro="2019-01-01";
    hastafiltro="2019-12-31";
    desde="";
    hasta="";
    productofiltro ="";
    categorias:any;
    categoriafiltro="";
    productos:any;    
    servicios:any;
    categoriacarga="";
    putObservacion=false;
    fichaClinicaservicio:any;
    empleadoServicio="";
    clienteServicio="";
    crearServicio =false;
    empleados:any;
    empleadoSelect: any;    
    nombreEmpleado="";    
    nombreCliente="";
    idCliente="";
    clienteSelect: any;
    clientes : any;
    agregarFichaEmpCl=false;
    nombreEmpleado2="";
    nombreCliente2="";

    ngOnInit() {
        this.filtrar(); 
        this.getListEmpleados(null);
        this.getListClientes(null);
    };
    tipoProd(){
        this.dataApi.getProductos(this.categoriafiltro).subscribe((productos:any)=>{
            this.productos=productos;
            console.log(this.productos);
        })
    }
    funagregarFichaEmpCl(){        
        this.agregarFichaEmpCl=false;
    }
    funagregarFichaEmpCl2(){
        this.agregarFichaEmpCl=true;
    }
    borrar(){        
        this.dataApi.deletefichaClinica(this.fila.idFichaClinica).subscribe(data=>{
            console.log(data);
        })
        this.getListfichaClinica();        
    }
    getListfichaClinica() {
        this.dataApi.getAllfichaClinicas(this.fisioterapeutafiltro,this.pacientefiltro,this.desde,this.hasta,this.productofiltro).subscribe((fichaClinica: any) => {
            this.fichaClinica = fichaClinica;        } );
        this.dataApi.getAllpersonas().subscribe((pacientes:any)=>{
            this.pacientes= pacientes;            

        });
        this.dataApi.getAllpersonas().subscribe((fisioterapeutas:any)=>{
            this.fisioterapeutas= fisioterapeutas;
        });
        this.dataApi.getAlltipoProducto().subscribe((tipoProducto:any)=>{
            this.tipoProductos=tipoProducto;
        }); 
        this.dataApi.getAllCategorias().subscribe((categoria:any)=>{
            this.categorias=categoria;             
        }); 
        this.tipoProd();        
    };    

  filtrar(){
    var a =this.desdefiltro.split("-");
    this.desde =a[0]+a[1]+a[2];
    var a =this.hastafiltro.split("-");
    this.hasta=a[0]+a[1]+a[2];
    this.getListfichaClinica();   
  }
  sumar() {       
    if(this.putObservacion){
        this.dataApi.modificarfichaClinica(this.observacion,this.fila).subscribe(
            data=>{
                console.log(data);
                this.getListfichaClinica(); 
            }); 
    }else{
        this.dataApi.addfichaClinicas(this.diagnostico,this.motivo,this.observacion,this.fisioterapeuta,
            this.paciente, this.tipoProducto).subscribe(
            data  => {
                console.log('POST Request is successful ', data);
                this.getListfichaClinica();
            }); 
    }                          
  }
  cargarfila(ficha: any){
    this.crearServicio=true;
    this.fila = ficha;    
    this.fichaClinicaservicio=ficha;
    this.observacion ="";
    this.empleadoServicio=ficha.idEmpleado.idPersona;
    this.clienteServicio=ficha.idCliente.idPersona;
  }
  cargarfilaFicha(ficha){
    this.fila = ficha;

    this.dataApi.getFichaUnico(ficha.idFichaClinica.idFichaClinica).subscribe(fichaClinica=> {
        this.fichaClinicaservicio = fichaClinica;        } );
    this.observacion = ficha.observacion;
    console.log(this.fichaClinicaservicio);
  }
  agregarObs(){
    this.dataApi.modificarfichaClinica(this.observacion,this.fila).subscribe(
        data=>{
            console.log(data);
        });
    this.getListfichaClinica();    
  }
  modificarFicha(row){
    this.cargarfila(row);
    this.crearServicio=false;
    this.putObservacion=true;
    var ficha;
    this.dataApi.getFichaUnico(row.idFichaClinica).subscribe(data=>{
        ficha=data;
        this.fisioterapeuta=ficha.idEmpleado.idPersona;
        this.paciente=ficha.idCliente.idPersona;
        this.categoriacarga = ficha.idTipoProducto.idCategoria.idCategoria;
        this.tipoProducto = ficha.idTipoProducto.idTipoProducto;
        this.motivo= ficha.motivoConsulta;
        this.diagnostico=ficha.diagnostico;
        this.observacion=ficha.observacion;
    });
    this.dataApi.getAllServiciosFicha(row.idFichaClinica).subscribe(data=>{
        console.log(row.idFichaClinica);
        this.servicios=data;
    })    
  } 
  clickAgregarFicha(){
    this.putObservacion=false;
    this.fisioterapeuta=1;
    this.paciente = 1;
    this.categoriacarga="";
    this.tipoProducto= 2;
    this.motivo= '';
    this.diagnostico= '';
    this.observacion= '';
    this.servicios={};
    this.nombreEmpleado2 = "";
    this.nombreCliente2= "";    

  }
  addservicio(){  
    if(this.crearServicio){
        this.dataApi.addServicio(this.observacion, this.fichaClinicaservicio.idFichaClinica).subscribe(data=>{        
            console.log(data);        
        }); 
    }else{
        this.dataApi.modificarServicio(this.observacion, this.fichaClinicaservicio.idFichaClinica).subscribe(data=>{        
            console.log(data);        
        });
    }      
}
getListEmpleadosFiltrado(buscarEmpleadoText){
    var filtro=$('input:radio[name=filtroEmpleado]:checked').val();
    this.dataApi.getEmpleadosFiltrado(filtro, buscarEmpleadoText.value).subscribe(empleados => {
      this.empleados = empleados;
      console.log("empleados", empleados);
      console.log("this.empleados", this.empleados);
  } );    
    console.log("filtro", filtro);
    console.log("buscarClienteText", buscarEmpleadoText.value);
  }
  getListClientesFiltrado(buscarClienteText){
    var filtro=$('input:radio[name=filtroCliente]:checked').val();
    this.dataApi.getClientesFiltrado(filtro, buscarClienteText.value).subscribe(clientes => {
      this.clientes = clientes;
      console.log("clientes", clientes);
      console.log("this.clientes", this.clientes);
  } );
    
    console.log("filtro", filtro);
    console.log("buscarClienteText", buscarClienteText.value);
  }
  getListClientes(buscarClienteText) {
    this.dataApi.getAllpersonas().subscribe(clientes => {
        this.clientes = clientes;
        console.log("clientes", clientes);
        console.log("this.clientes", this.clientes);
    } );
  }
  selectChangeHandlerEmpleado(empleado: any){
    //this.clienteSelect = event.target.value;
    console.log("select empleado ", empleado);
    this.empleadoSelect = empleado;
  }
  selectChangeHandler(cliente: any){
    //this.clienteSelect = event.target.value;
    console.log("select cliente ", cliente);
    this.clienteSelect = cliente;
  }
  getListEmpleados(buscarEmpleadoText) {
    this.dataApi.getAllpersonas().subscribe(empleados => {
        this.empleados = empleados;
        console.log("empleados", empleados);
        console.log("this.empleados", this.empleados);
    } );
  }
  seleccionarEmpleado(){        
    if(this.agregarFichaEmpCl){
        this.nombreEmpleado2 = this.empleados.lista[0].nombre + ' ' +this.empleados.lista[0].apellido;   
        this.fisioterapeuta= this.empleados.lista[0].idPersona;
    }else{
        this.nombreEmpleado = this.empleados.lista[0].nombre + ' ' +this.empleados.lista[0].apellido;    
        this.fisioterapeutafiltro=this.empleados.lista[0].idPersona;
    }  

  }
  seleccionarCliente(){
    if(this.agregarFichaEmpCl){
        this.nombreCliente2= this.clientes.lista[0].nombre + ' ' +this.clientes.lista[0].apellido;
        this.paciente=this.clientes.lista[0].idPersona; 
    }else{
        this.nombreCliente= this.clientes.lista[0].nombre + ' ' +this.clientes.lista[0].apellido;
        this.pacientefiltro=this.clientes.lista[0].idPersona; 
    }  
           
  }
  Limpiar(){
    this.nombreCliente= "";
    this.pacientefiltro="";
    this.nombreEmpleado = "";
    this.fisioterapeutafiltro="";
    this.desdefiltro="2019-01-01";
    this.hastafiltro="2019-12-31";
    this.categoriafiltro="";
    this.productofiltro="";
  }

}
