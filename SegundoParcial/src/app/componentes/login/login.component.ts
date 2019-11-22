import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public clave: string;
  public captcha: boolean = false;
  public usuarios: Array<any>

  constructor(private authService: AuthService, private router: Router, private fireStore: AngularFirestore)
  {
    this.usuarios = new Array<any>();
  }

  ngOnInit() {
    let usuarios = this.fireStore.collection("usuarios").valueChanges();

    usuarios.forEach(usuario=>
      {
        usuario.forEach(item=>
          {
            this.usuarios.push(item);
          })
      })

  }

  Loguearse()
  {
    this.authService.LoginUsuario(this.email, this.clave).then((res)=>
    {
      let entro: boolean = false;
      this.usuarios.forEach(user =>
        {
          if(user.email == this.email)
          {
            entro = true;
            switch(user.tipo)
            {
              case "Administrador":
                this.router.navigate(['/HomeAdmin']);
                break;
              case "Alumno":
                this.router.navigate(['/HomeAlumno']);
                break;
              case "Profesor":
                this.router.navigate(['/HomeProfe']);
                break;
            }
          }
        });

        if(entro == false)
        {
          alert('El usuario no esta en la base de datos');
          this.email = "";
          this.clave = "";
        }
      //this.router.navigate(['/Home']);
     }).catch(error=>
      {
          alert("Error");
      });
  }

  admin()
    {
      this.email="admin@admin.com";
        this.clave="123456";
    }

    profesor()
    {
      this.email="vincentvega@gmail.com";
        this.clave="123456";
    }

    alumno()
    {
      this.email="robertovelezbot@gmail.com";
      this.clave="123456";
    }

}
