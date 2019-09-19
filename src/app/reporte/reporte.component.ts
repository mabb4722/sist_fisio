import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { Router } from '@angular/router';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  detalleServicios: any;
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'tabl_reporte_resumido', // the id of html/table element
    options: {
      jsPDF: {
        orientation: 'landscape'
      }
    }
  }
    constructor(private dataApi: DataApiService, private _router: Router,private exportAsService: ExportAsService) { }
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
    response:any;
    agregarFichaEmpCl=false;
    nombreEmpleado="";  
    nombreCliente="";
    empleados:any;
    clientes : any;
    empleadoSelect: any;
    clienteSelect: any;
    empleadopro="";
    clientepro="";
    ngOnInit() {    
        this.getLisServicio();  
        this.dataApi.getAllempleados().subscribe((fisioterapeutas:any)=>{
          this.fisioterapeutas= fisioterapeutas;
        }); 
        this.dataApi.getAllpacientes().subscribe((pacientes:any)=>{
          this.pacientes= pacientes;
        });
        this.dataApi.getCategorias().subscribe((categoria:any)=>{
          this.categorias=categoria;             
        }); 
        this.getListClientes(null);
        this.getListEmpleados(null);
    };
     tipoProd(){
         this.dataApi.getProductos(this.categoriafiltro).subscribe((productos:any)=>{
             this.productos=productos;
             console.log(this.productos);
         })
         /*this.dataApi.getAllfichaClinicas("","","","","").subscribe((fichaClinica: fichaClinicaInterface) => {
             this.fichaClinica = fichaClinica;        } );*/
     }
   
    
    getLisServicio() {
      this.dataApi.getAllServiciosReporte().subscribe(response=>{
        console.log(response);
        this.response = response;
        this.servicios = this.response.lista;
        
      });
        // console.log(this.productofiltro);
        // this.dataApi.getAllservicios(this.desde,this.hasta,this.pacientefiltro,this.fisioterapeutafiltro,this.productofiltro).subscribe((servicios: any) => {
        //     this.servicios = servicios;        
        //     this.tipoProd();
        // } );   
        // this.dataApi.getallPresentacionProducto().subscribe(presentacion=>{
        //     this.presentacionProductos=presentacion;
        // })             
    }; 
    getdetalleServicio(){        
        // this.dataApi.getallDetalleServicio(this.servicio).subscribe(detalleServicios=>{            
        //     this.detalleServicios = detalleServicios;
        //     this.detalleArray.length = 0;            
        //     for (let detalle of this.detalleServicios) {                
        //         this.detalle.idDetalle=detalle.idServicioDetalle;
        //         this.detalle.presentacion=detalle.idPresentacionProducto.nombre;
        //         this.presentacion=detalle.idPresentacionProducto.idPresentacionProducto;
        //         this.precioPresentacion();                
        //         this.detalle.precioUnitario=this.precio;
        //         this.detalle.cantidad = detalle.cantidad;
        //         this.detalle.total=this.detalle.precioUnitario * this.detalle.cantidad;
        //         this.detalleArray.push(this.detalle);
        //         this.detalle={idDetalle:'',presentacion:'',precioUnitario:0,cantidad:0,total:0};
        //     }   
        //     console.log(this.detalleArray);         
        // })        
    }     
    cargarfila(row){
        this.fila=row;
        this.servicio = this.fila.idServicio;
        this.getdetalleServicio();
    }
   
    filtrar(){
        var a =this.desdefiltro.split("-");
        this.desde =a[0]+a[1]+a[2];
        var a =this.hastafiltro.split("-");
        this.hasta=a[0]+a[1]+a[2];        
        this.dataApi.getserviciosFiltro(this.desde,this.hasta,this.pacientefiltro,this.fisioterapeutafiltro,this.productofiltro).subscribe((servicios: any) => {
          this.servicios = servicios.lista;  
          console.log("Filtro");          
      } );
           
    }
    limpiar(){
        this.desdefiltro="2019-01-01";
        this.hastafiltro="2019-12-31";
        this.pacientefiltro="";
        this.fisioterapeutafiltro="";
        this.categoriafiltro="";
        this.productofiltro ="";
        this.precio=0;
    }    
    radiobu(event: any){  
        this.ficha=event.target.value;                      
        console.log(event.target.value);
    }
    // filtroDetalleFicha(){
    //     console.log("entro en filtro detalle");
    //     this.dataApi.getAllfichaClinicas(this.fisioterapeutafiltrodetalle,this.pacientefiltrodetalle,"","","").subscribe((fichaClinica: fichaClinicaInterface) => {
    //         this.fichaClinica = fichaClinica;        } );            
    // }
    // precioPresentacion(){
    //     this.dataApi.getpresentacionprecio(this.presentacion).subscribe(data=>{
    //         var pre:any=data;
    //         this.precio=pre.lista[0].precioVenta;
    //     })
    // }    
    exportar_pdf(){
      this.exportAsService.save(this.exportAsConfig, 'ReporteResumido').subscribe(() => {
        swal(
          {
            title: 'Descargado!',
            text: 'PDF Resumido descargado con éxito, revisar descargas!',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
          }
        )
      });
    }
    exportar_excel(){
      const exportAsConfigxls: ExportAsConfig = {
        type: 'xls', // the type you want to download
        elementId: 'tabl_reporte_resumido', // the id of html/table element
        
      }
      this.exportAsService.save(exportAsConfigxls, 'ReporteResumido').subscribe(() => {
        swal(
          {
            title: 'Descargado!',
            text: 'Excel Resumido descargado con éxito, revisar descargas!',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
          }
        )
      });
    }
    getListEmpleadosFiltrado(buscarEmpleadoText){
      var filtro=$('input:radio[name=filtroEmpleado]:checked').val();
      this.dataApi.getEmpleadosFiltradoRep(filtro, buscarEmpleadoText.value).subscribe(empleados => {
        this.empleados = empleados;
        console.log("empleados", empleados);
        console.log("this.empleados", this.empleados);
    } );    
      console.log("filtro", filtro);
      console.log("buscarClienteText", buscarEmpleadoText.value);
    }
    getListClientesFiltrado(buscarClienteText){
      var filtro=$('input:radio[name=filtroCliente]:checked').val();
      this.dataApi.getClientesFiltradoRep(filtro, buscarClienteText.value).subscribe(clientes => {
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
      } );
    }
    selectChangeHandlerEmpleado(empleado: any){
      //this.clienteSelect = event.target.value;    
      this.empleadoSelect = empleado;
    }
    selectChangeHandler(cliente: any){
      //this.clienteSelect = event.target.value;
      this.clienteSelect = cliente;
    }
    getListEmpleados(buscarEmpleadoText) {
      this.dataApi.getAllpersonas().subscribe(empleados => {
          this.empleados = empleados;
      } );
    }
    seleccionarEmpleado(){  
      var aux = this.empleadopro.split('|');      
      this.nombreEmpleado = aux[1];   
      this.fisioterapeutafiltro=aux[0];    
    }
    seleccionarCliente(){
      var aux = this.clientepro.split('|');
      this.nombreCliente= aux[1]; 
      this.pacientefiltro=aux[0];                 
    }

}
