import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public spinner:boolean = true;
  user: User = new User();
  public miSelect;

  constructor(private authSvc: AuthService, private router: Router, public alertController: AlertController)
  {
    setTimeout(() => {
      this.spinner = false;
    }, 2000);
  }

  ngOnInit() {
  }

  async onLogin()
  {
    const user = await this.authSvc.onLogin(this.user);

    console.log(this.miSelect);

    if(user)
    {
      console.log("Se logeo corectamente");
      this.router.navigateByUrl('/');
    }
    else
    {
      const alert = await this.alertController.create({
        header: 'Error de logeo',
        subHeader: 'El email o la contraseña no existen',
        buttons: [
          {
            text: 'OK',
            cssClass:'secondary'
        }]
      });

      await alert.present();
    }
  }

  logearse(us: string)
  {
    switch(us)
    {
      case "Admin":
        this.LoginAdmin();
        break;
      case "Invitado":
        this.LoginInvitado();
        break;
      case "Usuario":
        this.LoginUsuario();
        break;
      case "Anonimo":
        this.LoginAnonimo();
        break;
      case "Tester":
        this.LoginTester();
        break;


    }
  }

  async LoginAdmin()
  {
    this.user.email = "admin@admin.com";
    this.user.password = "111111"
  }

  async LoginInvitado()
  {
    this.user.email = "invitado@invitado.com";
    this.user.password = "222222"
  }

  async LoginUsuario()
  {
    this.user.email = "usuario@usuario.com";
    this.user.password = "333333"
  }

  async LoginAnonimo()
  {
    this.user.email = "anonimo@anonimo.com";
    this.user.password = "444444"
  }

  async LoginTester()
  {
    this.user.email = "tester@tester.com";
    this.user.password = "555555"
  }

}
