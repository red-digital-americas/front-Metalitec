import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ConectionapiService } from '../authService/conectionapi.service';
import { DialogMessageComponent } from '../dialog/dialog-message/dialog-message.component';
import { LoaderService } from '../loaderService/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;
  public recoverFormPassword: FormGroup;

  constructor(private _dialog: MatDialog, public loader: LoaderService, public router: Router, public auth: ConectionapiService, private _formBuilder: FormBuilder) {

    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.loginFormGroup = this._formBuilder.group({
      'email': [null, [Validators.required, Validators.maxLength(50), Validators.pattern(emailregex)]],
      'password': [null, [Validators.required, Validators.maxLength(50)]],
    });
    this.recoverFormPassword = this._formBuilder.group({
      'email_recover': [null, [Validators.required, Validators.pattern(emailregex)]]
    });

  }

  get email() {
    return this.loginFormGroup.get('email') as FormControl
  }

  get password() {
    return this.loginFormGroup.get('password') as FormControl
  }

  get email_recover() {
    return this.recoverFormPassword.get('email_recover') as FormControl
  }

  ngOnInit() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.loginFormGroup = this._formBuilder.group({
      'email': [null, [Validators.required, Validators.maxLength(50), Validators.pattern(emailregex)]],
      'password': [null, [Validators.required, Validators.maxLength(50)]],
    });
    this.recoverFormPassword = this._formBuilder.group({
      'email_recover': [null, [Validators.required, Validators.pattern(emailregex)]]
    });
  }

  selectedIndex = 0;
  selectTab(index: number): void {
    this.selectedIndex = index;
  }

  public type_input = 'password';
  public eyed: boolean = false;
  public changeType(type: any) {
    if (type == true) {
      this.type_input = 'text';
      this.eyed = true;
    } else {
      this.type_input = 'password';
      this.eyed = false;
    }
  }

  public getErrorEmail(): any {
    console.log("valid email: ", this.loginFormGroup)
    return this.loginFormGroup.get('email')?.hasError('required') ? 'Email es requerido' :
      this.loginFormGroup.get('email')?.hasError('pattern') ? 'El formato del email no es válido' : '';
  }

  public getErrorEmailRecover(): any {
    return this.recoverFormPassword.get('email_recover')?.hasError('required') ? 'Email es requerido' :
    this.recoverFormPassword.get('email_recover')?.hasError('pattern') ? 'El formato del email no es válido' : '';
  }

  onSubmit(form_data: any) {
    this.loader.show();
    console.log('Here ===> ', form_data);
    this.auth.service_general_post_with_url('User/Login?' + 'email=' + form_data.email + '&password=' + form_data.password, form_data)
      .subscribe((response: any) => {
        if (response.success) {
          this.loader.hide();
          localStorage.setItem('user', JSON.stringify(response.result))
          this.router.navigate(['/home/dashboard']);
        } else {
          this.loader.hide();
          const dialogRef = this._dialog.open(DialogMessageComponent, {
            data: {
              header: 'Acceso denegado',
              body: 'El usuario  y/o contraseña son errones por favor intenta nuevamente.'
            },
            width: '350px',
          });
          console.log("Usuario o password incorrectos")
        }
      })
  }

  public recoverPassword(form_data: any): void {
    this.loader.show();
    this.auth.service_general_put(`User/Recovery-password?email=${form_data.email_recover}`, form_data)
      .subscribe((response: any) => {
        if (response.success) {
          this.loader.hide();
          const dialogRef = this._dialog.open(DialogMessageComponent, {
            data: {
              header: 'Contraseña',
              body: 'El nuevo password se ha enviado a tu correo.'
            },
            width: '350px'
          });
          this.loader.hide();
        } else {
          const dialogRef = this._dialog.open(DialogMessageComponent, {
            data: {
              header: 'Error de sistema',
              body: 'Por favor intenta nuevamente si el error persiste comunicate con el area de soporte'
            },
            width: '350px'
          });
          this.loader.hide();
        }
      }, (error: any) => {
        const dialogRef = this._dialog.open(DialogMessageComponent, {
          data: {
            header: 'Error de sistema',
            body: 'Por favor intenta nuevamente si el error persiste comunicate con el area de soporte'
          },
          width: '350px'
        });
        this.loader.hide();
        console.log('Erro ===> ', error);
      });
  }

}