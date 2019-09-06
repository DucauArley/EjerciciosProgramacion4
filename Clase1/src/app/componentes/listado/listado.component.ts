import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  @Input() Usuarios: Array<Usuario> = new Array<Usuario>();
  @Output() editarUsuario: EventEmitter<any> = new EventEmitter<any>();
  @Output() borrarUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  Editar(usuario: Usuario) {
    this.editarUsuario.emit(usuario);
  }

  Borrar(usuario: Usuario) {
    this.borrarUsuario.emit(usuario);
  }

}
