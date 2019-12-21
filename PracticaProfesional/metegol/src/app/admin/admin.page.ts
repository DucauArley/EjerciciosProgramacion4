import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  providers:[DatePipe, Camera]
})
export class AdminPage implements OnInit {

  public spinner:boolean = true;
  public jugadorUno:string;
  public jugadorDos:string;
  public equipoUnoGoles:number = 0;
  public equipoDosGoles:number = 0;
  public base64Image:string = "../../assets/imagenes/cancha.png";
  public mensaje:string = "mi vieja mula ya no es lo que era";
  public alert:boolean = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private fireStore: AngularFirestore,
    private datePipe: DatePipe, private camera: Camera)
    {
      setTimeout(() => {
        this.spinner = false;
      }, 2000);
    }

  ngOnInit() {
  }

  guardarPartido()
  {

    let ok = this.validar();

    if(ok)
    {
      let fecha:any = new Date();
      fecha = this.datePipe.transform(fecha, 'yyyy-MM-dd-H:m:s');
      let resultado = "empate";

      if(this.equipoUnoGoles > this.equipoDosGoles)
      {
        resultado = this.jugadorUno;
      }
      else
      {
        if(this.equipoUnoGoles < this.equipoDosGoles)
        {
          resultado = this.jugadorDos;
        }
      }

      this.fireStore.collection("partidos").doc(fecha).set({
        fecha: fecha,
        jugadorUno: this.jugadorUno,
        jugadorDos: this.jugadorDos,
        golesju: this.equipoUnoGoles,
        golesjd: this.equipoDosGoles,
        foto: this.base64Image,
        ganador: resultado
      }).catch(function(error)
      {
        alert("Error al cargar");
      });

      setTimeout(() => {
        this.router.navigate(["/home"]);
      }, 1000);

    }
  }

  validar()
  {
    let retorno:boolean = true;

    if(this.jugadorUno === undefined && this.jugadorDos === undefined)
    {
      this.mensaje="Faltan completar los jugadores";
      this.alert = true;
      retorno = false;
    }
    else
    {
      if(this.jugadorUno === undefined || this.jugadorUno == "")
      {
        this.mensaje = "Falta completar el jugador uno";
        this.alert = true;
        retorno = false;
      }

      if(this.jugadorDos === undefined || this.jugadorDos == "")
      {
        this.mensaje = "Falta completar el jugador dos";
        this.alert = true;
        retorno = false;
      }
    }
    return retorno;
  }

  async cargarFoto()
  {
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
     this.base64Image = `data:image/jpeg;base64,${imageData}`;
    });

  }

  masEquipoUnoClick() {
    this.equipoUnoGoles++;
  }

  menosEquipoUnoClick(resultado) {
    if (this.equipoUnoGoles != 0) {
      this.equipoUnoGoles--;
    }
  }

  masEquipoDosClick() {
    this.equipoDosGoles++;
  }

  menosEquipoDosClick() {
    if (this.equipoDosGoles != 0) {
      this.equipoDosGoles--;
    }
  }

  onLogout()
  {
    console.log("Logout"); 
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login'); 
  }

}
