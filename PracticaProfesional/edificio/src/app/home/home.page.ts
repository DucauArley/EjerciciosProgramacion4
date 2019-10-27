import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FirebaseStorage } from '@angular/fire';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[Camera, Base64, DatePipe]
})
export class HomePage {

  public nombre:string;
  public apellido:string;
  public mostrar:boolean;
  public direccion:string;
  public profileImage;

  constructor(private authSvc: AuthService, private router: Router, private afAuth: AngularFireAuth, 
    private camera: Camera, private base64: Base64, public datepipe: DatePipe) 
  {

  }

  onLogout()
  {
    console.log("Logout"); 
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login'); 
  }

  direccionar(tipo:string)
  {
    let navigationExtras: NavigationExtras = { queryParams: 
      {tipoImg: tipo}};

      this.router.navigate(['listado'], navigationExtras);
  }
  
  
  encodeImageUri(imageUri, callback) 
  {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  }




}
