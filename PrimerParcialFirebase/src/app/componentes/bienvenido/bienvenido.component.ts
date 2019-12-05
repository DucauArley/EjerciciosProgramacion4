import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../servicios/auth.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  logeado:boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit()
  {
    this.getCurrentUser();
  }

  getCurrentUser()
  {
    this.authService.isAuth().subscribe(auth => {
      if (auth)
      {
        this.logeado = true;
      }
      else
      {
        this.logeado = false;
      }
    });
  }

  Logout()
  {
    this.authService.LogoutUsuario();
  }

}
