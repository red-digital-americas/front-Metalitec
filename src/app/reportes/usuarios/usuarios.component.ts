import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor() { }
  elements: any = [
    {id: 1, Nombre: 'Mark', Area: 'Almacen', Role: 'Gerente'},
    {id: 2, Nombre: 'Jacob', Area: 'Produccion', Role: 'Gerente'},
    {id: 3, Nombre: 'Larry', Area: 'Ensamble', Role: 'Admin'},
  ];

  headElements = ['id', 'Nombre', 'Area', 'Role', 'Accion'];

  ngOnInit(): void {
  }

}
