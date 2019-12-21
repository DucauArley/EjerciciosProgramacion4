import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx/index';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Camera]
})
export class HomePage {

  public spinner:boolean = true;
  public partidos:Array<any>;
  public email:string = firebase.auth().currentUser.email;

  constructor(private router: Router, private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore, private camera: Camera) 
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
    this.partidos = new Array<any>();
    let compare;

    res.forEach(item => 
      {
        this.partidos.push(item.payload.doc.data());
    });
  }

  async cambiarFoto(partido)
  {
    if(this.email == "admin@admin.com")
    {
      /*const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }*/

      let options: CameraOptions = {
        quality: 30,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 200,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true
      }

      await this.camera.getPicture(options).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = `data:image/jpeg;base64,${imageData}`;

      this.fireStore.collection("partidos").doc(partido.fecha).set({
        fecha: partido.fecha,
        jugadorUno: partido.jugadorUno,
        jugadorDos: partido.jugadorDos,
        golesju: partido.golesju,
        golesjd: partido.golesjd,
        foto: base64Image,
        ganador: partido.ganador
      }).catch(function(error)
      {
        alert(error);
      });

      });
    }

  }

  onLogout()
  {
    console.log("Logout"); 
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login'); 
  }

}
