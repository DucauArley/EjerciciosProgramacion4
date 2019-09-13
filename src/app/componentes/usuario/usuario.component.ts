import { Usuario } from './../../clases/usuario';
import { Component, OnInit, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public nombre: string;
  public clave: string;
  public usuario: Usuario;
  public usuarioEditar: Usuario;
  public editar: boolean = false;

  @Input() Usuarios: Array<Usuario> = new Array<Usuario>();
  @Output() seCreo: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  agregarUsuario() {
    const usuario: Usuario = new Usuario(this.nombre, this.clave);
    this.seCreo.emit(usuario);
  }

  guardarEditar()
  {
    var index = -1;
    var i = 0;
    this.Usuarios.forEach(obj =>
    {
      if(obj.nombre == this.usuarioEditar.nombre && obj.clave == this.usuarioEditar.clave)
      {
        index = i;
      }
      i = i + 1;
    });

    this.Usuarios[index] = new Usuario(this.nombre, this.clave);
    this.editar = false;
  }

  cancelarEditar()
  {
    this.usuario = new Usuario(this.usuarioEditar.nombre, this.usuarioEditar.clave);
    this.editar = false;
  }

  EditarUsuario(usuario: Usuario)
  {
    this.usuarioEditar = new Usuario(usuario.nombre, usuario.clave);
    this.nombre = this.usuarioEditar.nombre;
    this.clave = this.usuarioEditar.clave;
    this.usuario = usuario;
    this.editar = true;
  }

}
