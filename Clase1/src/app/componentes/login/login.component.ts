import { Usuario } from './../../clases/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;
  public ingresado: boolean;

  constructor()
  {
    this.usuario = new Usuario('pepe', 'secreto');
    this.usuario.nombre = 'Pepe';
    this.usuario.clave = 'secreto';

    this.ingresado = false;
  }

  ngOnInit()
  {
  }

  Ingresar()
  {
    console.info("Usuario", this.usuario);
    this.ingresado = true;
  }
}
