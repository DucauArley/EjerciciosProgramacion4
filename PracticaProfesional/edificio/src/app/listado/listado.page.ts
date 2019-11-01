import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { Route, ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Subscription } from 'rxjs';
import { IonSlides } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
  providers:[DeviceMotion, IonSlides, Camera, DatePipe]
})
export class ListadoPage implements OnInit {

  public tipoImg: string;
  public subscription: any;
  public data: any;
  public likes: Array<number>;
  public votos: Array<number>;
  public imagenes: Array<string>;
  public imagenesUrl: Array<string>;
  public nombres: Array<string>;
  public nombresUsers: Array<string>;
  public UltVotante: Array<string>;
  galleryType = '';
  @ViewChild('slideWithNav',{static:false}) slideWithNav: IonSlides;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1
  };
  

  constructor(private route: ActivatedRoute, private deviceMotion: DeviceMotion, private router: Router,
    private camera: Camera, public datepipe: DatePipe) 
  {
    this.imagenes = new Array<string>();
    this.imagenesUrl = new Array<string>();
    this.nombres = Array<string>();
    this.nombresUsers = new Array<string>();
    this.votos = new Array<number>();
    this.likes = new Array<number>();
    this.UltVotante = Array<string>();
    this.galleryType = 'todasFotos';
  }

  ngOnInit() 
  {
    this.route.queryParams.subscribe(params=>
      {
        this.tipoImg = params.tipoImg;
        console.log(params);

        this.leer(this.tipoImg);

        console.log(this.galleryType);
      })

      this.moverSlide();
  }

  async prueba()
  {  
    this.imagenesUrl = new Array<string>();
    this.nombresUsers = new Array<string>();
    this.likes = new Array<number>();

    for(var j in this.imagenes)
    {
      this.nombresUsers.push(this.imagenes[j]);
      this.likes.push(this.votos[j]);
      let storageDown = firebase.storage().ref();
      let imageDown = await storageDown.child('imagenes/' + this.imagenes[j]).getDownloadURL().then(url =>
      {
        this.imagenesUrl.push(url);
      //document.getElementById('myimg').setAttribute('src', url);
      
      //https://firebase.google.com/docs/storage/web/list-files como usar el listAll para saber cuantos son
      });
    }
    
  }

  leer(tipo: string)
  {
    var userId = firebase.auth().currentUser.email;//El mail del usuario actual
    var nombre = userId.split("@", 1);
    let algo = firebase.database().ref('imagenes/' + tipo);
    var retorno;

    algo.on('value', snapshot => {
      retorno = snapshot.val();

      this.nombres = new Array<string>();
      this.votos = new Array<number>();
      this.UltVotante = new Array<string>();
      this.imagenes = new Array<string>();

      for(var data in retorno)
      {
        this.votos.push(retorno[data]["likes"]);
        this.UltVotante.push(retorno[data]["ultVoto"]);
        this.imagenes.push(data);
      }

      this.prueba();
    });
    
  }

  leerUsuario(tipo: string)
  {
    var userId = firebase.auth().currentUser.email;//El mail del usuario actual
    var nombre = userId.split("@", 1);
    let algo = firebase.database().ref('imagenes/' + tipo);
    var retorno;

    algo.on('value', snapshot => {
      retorno = snapshot.val();

      this.nombres = new Array<string>();
      this.votos = new Array<number>();
      this.UltVotante = new Array<string>();
      this.imagenes = new Array<string>();

      for(var data in retorno)
      {
        if(retorno[data]["usuario"] == userId)
        {
          this.votos.push(retorno[data]["likes"]);
          this.UltVotante.push(retorno[data]["ultVoto"]);
          this.imagenes.push(data);
        }
      }

        this.prueba();
    });
  }

  moverSlide()
  {
    this.subscription = this.deviceMotion.watchAcceleration({frequency:350}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.data = acceleration;

      if(this.data.x > 5.0)
      {
        this.slideWithNav.slidePrev(500)
      }

      if(this.data.x < -5.0)
      {
        this.slideWithNav.slideNext(500);
      }

      if(this.data.y > 9.5)
      {
        this.router.navigate(['home']);
      }

    });
  }

  async sacarFoto(tipo: string)
  {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    //var algo = firebase.storage().ref('upload/').putString("hola que tal"); //Funciona

    /*return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('imagenes/img2');
      this.encodeImageUri('../../assets/imagenes/edificiolindo.jpg', function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
         reject(err);
        })
      });
    });*/

    let userId = firebase.auth().currentUser.email;
    let nombre = userId.split("@", 1);

    let curDate = new Date();
    let fecha =this.datepipe.transform(curDate, 'yyyy-MM-dd-hh:mm');

    var nombImg = fecha + nombre;

    await this.camera.getPicture(options).then(async (imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;

     //var img = imageData.split("0", 2);

      let storageRef = firebase.storage().ref();
      let imageRef = await storageRef.child('imagenes/' + nombImg);
      imageRef.putString(base64Image, 'data_url').then(function(snapshot)
      {
        console.log("Eat shit bitch");
      });

      firebase.database().ref("imagenes/" + tipo + "/" + nombImg).set({
      usuario: userId,
      likes: 0,
      ultVoto: ""
      });
    })
  }

  graficar()
  {
    let navigationExtras: NavigationExtras = { queryParams: 
      {tipoImg: this.tipoImg}};

      this.router.navigate(['admin'], navigationExtras);
  }

  likear(i:number)
  {
    var userId = firebase.auth().currentUser.email;

    if(userId != this.UltVotante[i])
    {
      this.likes[i] = this.likes[i] + 1;

      firebase.database().ref("imagenes/" + this.tipoImg + "/" + this.imagenes[i]).set({
        usuario: this.nombres[i],
        likes: this.likes[i],
        ultVoto: userId
        }); 

      let algo = firebase.database().ref('imagenes/' + this.tipoImg);
      var retorno;

      algo.on('value', snapshot => {
      retorno = snapshot.val();
      this.UltVotante = new Array<string>();

      for(var data in retorno)
      {
        this.UltVotante.push(retorno[data]["ultVoto"])
      }
      });
    }
    else
    {
      this.likes[i] = this.likes[i] - 1;

      firebase.database().ref("imagenes/" + this.tipoImg + "/" + this.imagenes[i]).set({
        usuario: this.nombres[i],
        likes: this.likes[i],
        ultVoto: ""
        }); 

      let algo = firebase.database().ref('imagenes/' + this.tipoImg);
      var retorno;

      algo.on('value', snapshot => {
      retorno = snapshot.val();
      this.UltVotante = new Array<string>();

      for(var data in retorno)
      {
        this.UltVotante.push(retorno[data]["ultVoto"])
      }
      });
    }

  }

}
