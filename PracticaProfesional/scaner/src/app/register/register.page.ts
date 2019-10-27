import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user:User = new User();

  constructor(private authSvc: AuthService, private router: Router, public alertController: AlertController) 
  {

  }

  ngOnInit() {
  }

  async onRegister()
  {
    const user = await this.authSvc.onRegister(this.user);

    if(user)
    {
      console.log("Se creo correctamente el usuario");
      this.router.navigateByUrl('/');
    }
    else
    {
      const alert = await this.alertController.create({
        header: 'Error en el registro',
        subHeader: 'El email o la contraseña tienen que tener mas de 6 caracteres',
        buttons: [
          {
            text: 'OK',
            cssClass: 'secondary'
        }]
      });

      await alert.present();
    }
  }



}
