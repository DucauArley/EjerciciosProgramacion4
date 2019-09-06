import { Usuario } from './../../clases/usuario';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public nombre: string;
  public clave: string;

  @Output() seCreo: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  agregarUsuario() {
    const usuario: Usuario = new Usuario(this.nombre, this.clave);
    this.seCreo.emit(usuario);
  }

  editarUsuario()
  {

  }

  borrarUsuario()
  {

  }

}
