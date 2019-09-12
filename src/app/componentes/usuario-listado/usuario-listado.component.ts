import { Usuario } from './../../clases/usuario';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-usuario-listado',
  templateUrl: './usuario-listado.component.html',
  styleUrls: ['./usuario-listado.component.css']
})

export class UsuarioListadoComponent implements OnInit {

  constructor() { }

  listaUsuarios: Array<Usuario> = new Array<Usuario>();

  hacerAlgo($event)
  {
    // tslint:disable-next-line: no-console
    console.info('Objeto:', $event);
    this.listaUsuarios.push($event);
  }

  @ViewChild(UsuarioComponent, {static: false}) usuario :UsuarioComponent;

  BorrarUsuario(usuario: Usuario)
  {
    const index = this.listaUsuarios.indexOf(usuario);
    this.listaUsuarios.splice(index, 1);
  }

  ngOnInit() {
  }

}
