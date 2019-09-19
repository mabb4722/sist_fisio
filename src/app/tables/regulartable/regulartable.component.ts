import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { DataApiService } from 'src/app/services/data-apia89.service';
import {Categoria} from '../../categoria';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
declare const $: any;
@Component({
    selector: 'app-regular-table-cmp',
    templateUrl: 'regulartable.component.html'
})
export class RegularTableComponent implements OnInit {
    detalleServicios: any;
    constructor(private dataApi: DataApiService, private _router: Router) { }
    servicios:any;
    productofiltro ="";
    categorias:any;
    categoriafiltro="";
    productos:any;
    fichaClinica:any;
    ficha="";
    observacion="";
    fila:any;
    cantidadDetalle=0;
    presentacionProductos:any;
    presentacion='';
    servicio='';
    filaDetalle:any;
    desdefiltro="2019-01-01";
    hastafiltro="2019-12-31";
    fisioterapeutas:any;
    pacientes:any;
    fisioterapeutafiltro="";
    pacientefiltro="";
    desde="";
    hasta="";
    fisioterapeutafiltrodetalle="";
    pacientefiltrodetalle="";
    precio=0;   
    detalle={idDetalle:'',presentacion:'',precioUnitario:0,cantidad:0,total:0};    
    detalleArray= new Array();
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
    clientepro="";
    empleadopro="";
    ngOnInit() {    
        this.getLisServicio();  
        this.dataApi.getAllempleados().subscribe((fisioterapeutas:any)=>{
            this.fisioterapeutas= fisioterapeutas;
        }); 
        this.dataApi.getAllpacientes().subscribe((pacientes:any)=>{
            this.pacientes= pacientes;
        });
        this.dataApi.getAllCategorias().subscribe((categoria:any)=>{
            this.categorias=categoria;             
        }); 
        this.getListEmpleados(null);
        this.getListClientes(null);
    };
    tipoProd(){
        this.dataApi.getProductos(this.categoriafiltro).subscribe((productos:any)=>{
            this.productos=productos;
            console.log(this.productos);
        })
        this.dataApi.getAllfichaClinicas("","","","","").subscribe((fichaClinica: any) => {
            this.fichaClinica = fichaClinica;        } );
    }
    addservicio(){        
        this.dataApi.addServicio(this.observacion, this.ficha).subscribe(data=>{
            this.servicio=data;
            console.log(this.servicio);
            //this.getLisServicio();
        });   
    }
    addDetalle(){
        console.log(this.servicio, this.presentacion, this.cantidadDetalle);
        this.dataApi.addDetalle(this.servicio,this.presentacion,this.cantidadDetalle).subscribe(data=>{
            console.log(data);
            this.presentacion="";
            this.cantidadDetalle=0;
            this.getdetalleServicio();
        });
    }
    getLisServicio() {
        console.log(this.productofiltro);
        this.dataApi.getAllservicios(this.desde,this.hasta,this.pacientefiltro,this.fisioterapeutafiltro,this.productofiltro).subscribe((servicios: any) => {
            this.servicios = servicios;        
            this.tipoProd();
        } );   
        this.dataApi.getallPresentacionProducto().subscribe(presentacion=>{
            this.presentacionProductos=presentacion;
        })             
    }; 
    getdetalleServicio(){        
        this.dataApi.getallDetalleServicio(this.servicio).subscribe(detalleServicios=>{            
            this.detalleServicios = detalleServicios;
            this.detalleArray.length = 0;            
            for (let detalle of this.detalleServicios) {                
                this.detalle.idDetalle=detalle.idServicioDetalle;
                this.detalle.presentacion=detalle.idPresentacionProducto.nombre;
                this.presentacion=detalle.idPresentacionProducto.idPresentacionProducto;
                this.precioPresentacion();                
                this.detalle.precioUnitario=this.precio;
                this.detalle.cantidad = detalle.cantidad;
                this.detalle.total=this.detalle.precioUnitario * this.detalle.cantidad;
                this.detalleArray.push(this.detalle);
                this.detalle={idDetalle:'',presentacion:'',precioUnitario:0,cantidad:0,total:0};
            }   
            console.log(this.detalleArray);         
        })        
    }     
    cargarfila(row){
        this.fila=row;
        this.servicio = this.fila.idServicio;
        this.getdetalleServicio();
    }
    borrardetalle(){
        this.dataApi.deleteDetalleServicio(this.fila.idServicio,this.filaDetalle.idDetalle).subscribe(data=>{
            console.log(data);
            this.getdetalleServicio();
        })
    }
    filtrar(){
        var a =this.desdefiltro.split("-");
        this.desde =a[0]+a[1]+a[2];
        var a =this.hastafiltro.split("-");
        this.hasta=a[0]+a[1]+a[2];
        this.getLisServicio();   
    }
    limpiar(){
        this.desdefiltro="2019-01-01";
        this.hastafiltro="2019-12-31";
        this.pacientefiltro="";
        this.fisioterapeutafiltro="";
        this.categoriafiltro="";
        this.productofiltro ="";
        this.precio=0;
        this.nombreCliente= ""; 
        this.nombreEmpleado = "";          
    }    
    radiobu(event: any){  
        this.ficha=event.target.value;                      
        console.log(event.target.value);
    }
    filtroDetalleFicha(){
        console.log("entro en filtro detalle");
        this.dataApi.getAllfichaClinicas(this.fisioterapeutafiltrodetalle,this.pacientefiltrodetalle,"","","").subscribe((fichaClinica: any) => {
            this.fichaClinica = fichaClinica;        } );            
    }
    precioPresentacion(){
        this.dataApi.getpresentacionprecio(this.presentacion).subscribe(data=>{
            var pre:any=data;
            this.precio=pre.lista[0].precioVenta;
        })
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
        var aux = this.empleadopro.split('|');      
    if(this.agregarFichaEmpCl){        
        this.nombreEmpleado2 = aux[1]; 
        this.fisioterapeutafiltrodetalle= aux[0]; 
        this.filtroDetalleFicha();
    }else{
        this.nombreEmpleado = aux[1];   
        this.fisioterapeutafiltro=aux[0];
    }      
    }
    seleccionarCliente(){
        var aux = this.clientepro.split('|');
        console.log("esto",this.clientepro)
    if(this.agregarFichaEmpCl){        
        this.nombreCliente2= aux[1];
        this.pacientefiltrodetalle=aux[0];
        this.filtroDetalleFicha();
    }else{
        this.nombreCliente= aux[1]; 
        this.pacientefiltro=aux[0]; 
    }                 
    }
    funagregarFichaEmpCl(){               
        this.agregarFichaEmpCl=false;
    }
    funagregarFichaEmpCl2(){        
        this.agregarFichaEmpCl=true;
    }
    limpiarmodal(){
        this.nombreCliente2= "";
        this.pacientefiltrodetalle="";
        this.nombreEmpleado2 = "";
        this.fisioterapeutafiltrodetalle="";
        this.observacion="";
    }
}
