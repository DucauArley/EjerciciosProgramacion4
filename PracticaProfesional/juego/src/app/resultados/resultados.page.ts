import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../servicios/chats.service';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import {AuthService} from "../servicios/auth.service";
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {
  public userProfile: any;
  public spinner:boolean = true;
  filename:string;
  students: any;
  foto:string;
  nombre: string;
  codigoUid:string="";
  votacion:any;
  name:any;
  public puntajesTotales: Array<any> = new Array<any>();
  public puntajes: Array<any> = new Array<any>();
  public p1 = {puntaje: "00:00:00.000"};
  public p2 = {puntaje: "00:00:00.000"};
  public p3 = {puntaje: "00:00:00.000"};
  
  x:string;
  y:string;
  z:string;
  timeStamp:string;

  constructor(private crudService: ChatsService,private user:AuthService, private router: Router,
    private fireStore: AngularFirestore)
  { 
    setTimeout(() => {
      this.spinner = false;
    }, 2000);

    this.puntajesTotales = new Array<any>();
    this.puntajes = new Array<any>();

    let punt = this.fireStore.collection("puntajes").snapshotChanges().subscribe(res=>
      {
        this.tomarPuntajes(res);
      });

  }

  tomarPuntajes(res)
  {
    this.puntajesTotales = new Array<any>();
    let compare;

    res.forEach(item => 
      {
        this.puntajesTotales.push(item.payload.doc.data());
    });
 
    setTimeout(() => {
      this.puntajesTotales.forEach(pun=>
        {
          if(this.p1.puntaje < pun.puntaje)
          {
            this.p1 = pun;
          }
          else
          {
            if(this.p2.puntaje < pun.puntaje)
            {
              this.p2 = pun
            }
            else
            {
              if(this.p3.puntaje < pun.puntaje)
              {
                this.p3 = pun;
              }
            }
          }
        });

        this.puntajes.push(this.p1);
        this.puntajes.push(this.p2);
        this.puntajes.push(this.p3);
    }, 1000);
  }

  ngOnInit() {
  
  }

  irMenu()
  {
    this.router.navigateByUrl('menu');

  }

}
