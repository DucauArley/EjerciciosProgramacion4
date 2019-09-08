import { Usuario } from './../../clases/usuario';
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

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

  @Output() seCreo: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  agregarUsuario() {
    const usuario: Usuario = new Usuario(this.nombre, this.clave);
    this.seCreo.emit(usuario);
  }

  EditarUsuario(usuario: Usuario)
  {
    console.info("Funca");
    this.usuarioEditar = new Usuario(usuario.nombre, usuario.clave);
    this.nombre = this.usuarioEditar.nombre;
    this.clave = this.usuarioEditar.clave;
    this.usuario = usuario;
    this.editar = true;
  }

}
