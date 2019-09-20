import { Usuario } from './../../clases/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;
  public ingresado: boolean;

  constructor(public router: Router)
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
    if(this.usuario.nombre == "fressi" && this.usuario.clave == "1234")
    {
      console.info("Usuario", this.usuario);
      this.ingresado = true;
      this.router.navigate(['/inicio']);

    }
    else
    {
      alert("Usuario o contraseña incorrecta");
    }
  }
}
