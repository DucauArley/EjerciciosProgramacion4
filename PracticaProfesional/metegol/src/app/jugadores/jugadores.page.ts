import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
})
export class JugadoresPage implements OnInit {

  public spinner:boolean = true;
  public ganadores:Array<any>;
  public jugadores:Array<any>;
  public jugadoresVic:Array<any>;
  public j1 = {partidos: 0}
  public j2 = {partidos: 0}
  public j3 = {partidos: 0}
  public j4 = {partidos: 0}
  public j5 = {partidos: 0}

  constructor(private router: Router, private afAuth: AngularFireAuth,private fireStore: AngularFirestore)
  {
    setTimeout(() => {
      this.spinner = false;
    }, 2000);

    let parts = this.fireStore.collection("partidos").snapshotChanges().subscribe(res=>
    {
      this.tomarPartidos(res);
    });
}

tomarPartidos(res)
{
  this.ganadores = new Array<any>();
  this.jugadores = new Array<any>();
  this.jugadoresVic = new Array<any>();
  let compare;

  res.forEach(item => 
    {
      compare = item.payload.doc.data();
      if(compare["ganador"] != "empate")
      {
        this.ganadores.push(compare["ganador"]);
      }
  });

  var repetidos = {};
  var todo = {}

  this.ganadores.forEach(function(numero){
    repetidos[numero] = (repetidos[numero] || 0) + 1
    todo[numero] = {jugador: numero, partidos: repetidos[numero]}
  });

  for(let nombre in todo)
  {
    this.jugadores.push(todo[nombre]);
  }

  setTimeout(() => {
    this.jugadores.forEach(ju=>
      {
        if(this.j1.partidos < ju.partidos)
        {
          this.j1 = ju;
        }
        else
        {
          if(this.j2.partidos < ju.partidos)
          {
            this.j2 = ju
          }
          else
          {
            if(this.j3.partidos < ju.partidos)
            {
              this.j3 = ju;
            }
            else
            {
              if(this.j4.partidos < ju.partidos)
              {
                this.j4 = ju;
              }
              else
              {
                if(this.j5.partidos < ju.partidos)
                {
                  this.j5 = ju;
                }
              }
            }
          }
        }
      });

      this.jugadoresVic.push(this.j1);
      this.jugadoresVic.push(this.j2);

      if(this.j3.partidos != 0)
      {
        this.jugadoresVic.push(this.j3);
      }

      if(this.j4.partidos != 0)
      {
        this.jugadoresVic.push(this.j4);
      }

      if(this.j5.partidos != 0)
      {
        this.jugadoresVic.push(this.j5);
      }

    }, 1000);
}

  ngOnInit() {
  }

  onLogout()
  {
    console.log("Logout"); 
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login'); 
  }

}
