import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego/juego.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public spinner:boolean = true;

  constructor(private js: JuegoService, private router: Router)
  {
    setTimeout(() => {
      this.spinner = false;
    }, 2000);
  }

  ngOnInit() {
  }

  imagenMaravilla()
  {
    this.js.getPersonaje("assets/ironman_fly.png");
    this.router.navigateByUrl('juego');
  }

  imagenTormenta()
  {
    this.js.getPersonaje("assets/batman_fly.png");
    this.router.navigateByUrl('juego');
  }

  onLogout()
  {
    console.log("Logout"); 
    this.router.navigateByUrl('/login'); 
  }

}
