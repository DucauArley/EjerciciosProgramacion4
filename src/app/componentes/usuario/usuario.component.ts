import { Component, OnInit } from '@angular/core';
import { AuthService } from  './../../servicios/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  email: string = "";
  clave: string = "";
  public tipoUsuario: string = "Alumno";

  constructor(private router: Router, private authService: AuthService, private fireStore: AngularFirestore)
  { }

  ngOnInit() {
  }

  Registrar()
  {
    this.authService.RegistrarUsuario(this.email, this.clave).then((res)=>
    {
      this.fireStore.collection("usuarios").doc(this.email).set({
        email: this.email,
        tipo: this.tipoUsuario,
      }).catch(function(error)
      {
        alert("Error al registrarse");
      })

      this.router.navigate(['/Login']);
    }).catch(error => console.log("Error:", error));
  }


}
