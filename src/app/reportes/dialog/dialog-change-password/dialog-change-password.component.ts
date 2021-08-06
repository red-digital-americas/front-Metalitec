import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConectionapiService } from 'src/app/authService/conectionapi.service';
import { LoaderService } from 'src/app/loaderService/loader.service';



@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ConectionapiService,
    public _dialog: MatDialog,
    private formBuilder: FormBuilder,
    public loader: LoaderService) { }

    active_password: boolean = false;
    active_password2: boolean = false;
    password2 : any;
    regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    hintMessen: any;
    hintMessen2: any;
    hintId =  document.getElementById('hintpass');
    hintId2 = document.getElementById('hintpass2');
    passCorrect: boolean = false;
  
  validar: boolean = false;
  btnDisables = false;


  ngOnInit(): void {
    this.loader.show();
    this.loader.hide();
  }
  validarPass() {
    if(this.data.password == undefined && this.data.password != ''){
      this.hintMessen = "Campo requerido";
      this.hintMessen2 = "Campo requerido";
      this.active_password = true;
    }if(this.password2 == undefined && this.password2 != ''){
      this.hintMessen = "Campo requerido";
      this.hintMessen2 = "Campo requerido";
      this.active_password2 = true;
    }
    if (this.data.password != '' && this.password2 != '') {
      //si las contraseñas no coinciden
      if (this.data.password != this.password2) {
        this.active_password = true;
        this.active_password2 = true;
        this.hintMessen = "No es la misma contraseña";
        this.hintMessen2 = "No es la misma contraseña";
      }
      else if (this.data.password == this.password2) {
        //Si todo esta correcto
        if (this.regex.test(this.data.password)) {
          this.active_password = false;
          this.active_password2 = false;
          console.log('correcto las contraseñas coinciden');
          this.passCorrect = true;

        }
        // si no es correcto
        else {
          this.active_password = true;
          this.active_password2 = true;
          this.hintMessen = "Contraseña invalida";
          this.hintMessen2 = "Contraseña invalida";
          // letras mayusculas
          let patronMayus = /[A-Z]/g;
          let letterUpercaseSearch = (this.data.password.match(patronMayus));
          if (letterUpercaseSearch == null) {
            console.log('no hay letras mayus');
            this.hintMessen = "Agrega una letra mayuscula";
            this.hintMessen2 = "Agrega una letra mayuscula";
          }
          else {
            console.log('si hay mayusculas');
            console.log(this.data.password.match(patronMayus));
          }
          // buscar numeros
          let patronnumber = /[1-9]/g;
          let numberSearch = (this.data.password.match(patronnumber));
          if (numberSearch == null) {
            console.log('no hay numeros');
            this.hintMessen = "Agrega un numero";
            this.hintMessen2 = "Agrega un numero";
          }
          else {
            console.log('si hay numeros');
            console.log(this.data.password.match(patronnumber));
          }
          // mayor a 8 caracteres
          if (this.data.password.length < 8) {
            this.hintMessen = "Minimo 8 caracteres";
            this.hintMessen2 = "Minimo 8 caracteres";
          }
        }
      }
    }
    else {
      this.active_password = true;
      this.active_password2 = true;
      this.hintMessen = "Contraseña vacia";
      this.hintMessen2 = "Contraseña vacia";
    }
  }
  validarForm() {
    if (this.passCorrect == true) {
      this.save();
    }
    else {
      this.active_password = true;
      this.active_password2 = true;
      this.hintMessen = "Contraseña invalida";
      this.hintMessen2 = "Contraseña invalida";
    }
  }


  save() {
    this.loader.show();
    this.btnDisables = true;
    this._services.service_general_put('User/Change-Password?email=' + this.data.email+ '&password='+ this.data.password, '').subscribe(r => {
      if (r.success) {
        console.log('respuesta de update', r);
        this.loader.hide();
        this.dialogRef.close(1);
      }
      else {
        this.loader.hide();
        this.dialogRef.close(2);
       }
    })
  }

}
