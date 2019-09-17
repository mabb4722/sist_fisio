import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    hasErrorEmail = false;
    hasErrorUser = false;
    hasErrorPassword = false;
    usuarios = null;
    loginExitoso= false;
    loginExitosoExistente = localStorage.getItem('loginExitoso');
    constructor(private dataApi: DataApiService,private _router: Router,private element: ElementRef) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        if(this.loginExitosoExistente== 'true'){
            this._router.navigate(['dashboard']);
        }else{
            var navbar : HTMLElement = this.element.nativeElement;
            this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
            const body = document.getElementsByTagName('body')[0];
            body.classList.add('login-page');
            body.classList.add('off-canvas-sidebar');
            const card = document.getElementsByClassName('card')[0];
            setTimeout(function() {
                // after 1000 ms we add the class animated to the login/register card
                card.classList.remove('card-hidden');
            }, 700);
        }
       
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }
    login(){
        const usuario = $('#nombreLogin').val();
        const email = $('#emailLogin').val();
        const password = $('#passwordLogin').val();
        console.log(usuario,email,password, password.length, password.length<8);
        if (usuario != null && usuario != '') {
            this.hasErrorUser = false;
        } else {
            this.hasErrorUser = true;
        }
        if (!this.validateEmail(email)) {
            this.hasErrorEmail = true;
        } else {
            this.hasErrorEmail = false;
        }
        if (password.length<8) {
            this.hasErrorPassword = true;
        }else{
            this.hasErrorPassword = false;
        }
        if (!this.hasErrorEmail && !this.hasErrorPassword && !this.hasErrorUser) {
            this.dataApi.getUsuariosLogin().subscribe(response=>{
                this.usuarios = response;
                this.usuarios.lista.forEach(usuarioWeb => {
                    if (usuarioWeb.usuarioLogin == usuario && usuarioWeb.email == email) {
                        this.loginExitoso = true;
                        localStorage.setItem('usuario', usuarioWeb.nombreCompleto);
                        localStorage.setItem('loginExitoso','true');
                        this._router.navigate(['dashboard']);
                        swal(
                            {
                              title: 'Bienvenido!',
                              text: 'Has ingresado con éxito!',
                              type: 'success',
                              confirmButtonClass: "btn btn-success",
                              buttonsStyling: false
                            }
                          )
                    }
                });
                if (!this.loginExitoso) {
                    localStorage.setItem('loginExitoso','false');
                    swal(
                        {
                          title: 'Error!',
                          text: 'Usuario o password inválido, favor intentar de nuevo.',
                          type: 'error',
                          confirmButtonClass: "btn btn-info",
                          buttonsStyling: false
                        }
                      )
                }
            });
            
        } 
    }
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
