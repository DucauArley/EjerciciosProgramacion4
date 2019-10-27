import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ColoresPage } from '../colores/colores.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public nombre:string;
  public apellido:string;
  public mostrar:boolean;
  public direccion:string;
  public ingles: number = 0;
  public español: number = 0;
  public portugues: number = 0;

  constructor(private authSvc: AuthService, private router: Router, private afAuth: AngularFireAuth) 
  {
    this.cambiarNombres(4);
  }

  onLogout()
  {
    console.log("Logout"); 
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login'); 
  }
  
  resetear()
  {
    this.ingles = 0;
    this.español = 0;
    this.portugues = 0;
  }

  irPagina(pag:number)
  {
    let navigationExtras: NavigationExtras = { queryParams: 
      {ingles: this.ingles,
      español: this.español,
    portugues: this.portugues}};

    switch(pag)
    {
      case 1://colores
        this.router.navigate(['colores'], navigationExtras);
        break;
      case 2://numeros
        this.router.navigate(['numeros'], navigationExtras);
        break;
      case 3://animales
        this.router.navigate(['animales'], navigationExtras);
        break;

    }
  }

  cambiarNombres(idioma: number)
  {
    this.resetear();
    switch(idioma)
    {
      case 1://español
        this.español = 1;
        document.getElementById("bIng").classList.remove("borde");
        document.getElementById("bPor").classList.remove("borde");
        document.getElementById("bEsp").classList.add("borde");
        break;
      case 2://ingles
        this.ingles = 1;
        document.getElementById("bPor").classList.remove("borde");
        document.getElementById("bEsp").classList.remove("borde");
        document.getElementById("bIng").classList.add("borde");
        break;
      case 3://portugues
        this.portugues = 1;
        document.getElementById("bEsp").classList.remove("borde");
        document.getElementById("bIng").classList.remove("borde");
        document.getElementById("bPor").classList.add("borde");
        break;
      default:
        this.español = 1;
        break;
    }

  }

}
