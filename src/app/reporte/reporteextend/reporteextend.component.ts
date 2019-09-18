import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { DataApiService } from 'src/app/services/data-api.service';
import swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-reporteextend',
  templateUrl: './reporteextend.component.html',
  styleUrls: ['./reporteextend.component.css']
})
export class ReporteextendComponent implements OnInit {

  detalleServicios: any;
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'tabl_reporte_extend', // the id of html/table element
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
    // detalle={idDetalle:'',presentacion:'',precioUnitario:0,cantidad:0,total:0};    
    detalleArray= new Array();
    response:any;
    detalle={fechaHora:'', fisioterapeuta:'',paciente:'',precioUnitario:0,cantidad:0,total:0,nombreProducto:''}; 
    ngOnInit() {    
        this.getLisServicio();  
        // this.dataApi.getAllempleados().subscribe((fisioterapeutas:any)=>{
        //     this.fisioterapeutas= fisioterapeutas;
        // }); 
        // this.dataApi.getAllpacientes().subscribe((pacientes:any)=>{
        //     this.pacientes= pacientes;
        // });
        this.dataApi.getCategorias().subscribe((categoria:any)=>{
            this.categorias=categoria;             
        }); 
    };
    // tipoProd(){
    //     this.dataApi.getProductos(this.categoriafiltro).subscribe((productos:any)=>{
    //         this.productos=productos;
    //         console.log(this.productos);
    //     })
    //     this.dataApi.getAllfichaClinicas("","","","","").subscribe((fichaClinica: fichaClinicaInterface) => {
    //         this.fichaClinica = fichaClinica;        } );
    // }
   
    
    getLisServicio() {
      this.dataApi.getAllServiciosReporte().subscribe(response=>{
        console.log(response);
        this.response = response;
        this.servicios = this.response.lista;
        this.detalleArray.length = 0;       
            for (let servicio of this.servicios) {
                this.getdetalleServicio(servicio);           
            } 
        
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
    getdetalleServicio(servicio){        
      this.dataApi.getallDetalleServicio(servicio.idServicio).subscribe(detalleServicios=>{            
        this.detalleServicios = detalleServicios;                 
        for (let detalle of this.detalleServicios) { 
          console.log('detalle',detalle);
            this.detalle.fechaHora=servicio.fechaHora;
            this.detalle.fisioterapeuta=servicio.idEmpleado.nombre+' '+servicio.idEmpleado.apellido;
            this.detalle.paciente=servicio.idFichaClinica.idCliente.nombre+' '+servicio.idFichaClinica.idCliente.apellido;
            this.precioPresentacion();                
            this.detalle.precioUnitario=this.precio;
            this.detalle.cantidad = detalle.cantidad;
            this.detalle.total=this.detalle.precioUnitario * this.detalle.cantidad;
            this.detalle.nombreProducto = detalle.idPresentacionProducto.descripcionGeneral;
            this.detalleArray.push(this.detalle);
            this.detalle={fechaHora:'', fisioterapeuta:'',paciente:'',precioUnitario:0,cantidad:0,total:0,nombreProducto:''};
        }   
        console.log(this.detalleArray);         
    })           
    }     
    cargarfila(row){
        this.fila=row;
        this.servicio = this.fila.idServicio;
        this.getdetalleServicio(this.servicio);
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
      this.exportAsService.save(this.exportAsConfig, 'ReporteExtendido').subscribe(() => {
        swal(
          {
            title: 'Descargado!',
            text: 'PDF Extendido descargado con éxito, revisar descargas!',
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
        elementId: 'tabl_reporte_extend', // the id of html/table element
        
      }
      this.exportAsService.save(exportAsConfigxls, 'ReporteExtendido').subscribe(() => {
        swal(
          {
            title: 'Descargado!',
            text: 'Excel Extendido descargado con éxito, revisar descargas!',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
          }
        )
      });
    }
      
     
    

    
    precioPresentacion(){
        this.dataApi.getpresentacionprecio(this.presentacion).subscribe(data=>{
            var pre:any=data;
            this.precio=pre.lista[0].precioVenta;
        })
    }


}