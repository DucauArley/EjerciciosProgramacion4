import { Usuario } from './../../clases/usuario';
import { Component, OnInit } from '@angular/core';

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


  ngOnInit() {
  }

}
