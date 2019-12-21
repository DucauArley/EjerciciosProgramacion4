import { Component, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http'; 
import * as firebase from 'firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[BarcodeScanner]
})
export class HomePage {

  public creditoTotal:number = 0;
  public creditoBruto:number = 0;
  public codigoScaneado:string = "";
  public cod1: number = 0;
  public cod2: number = 0;
  public cod3: number = 0;
  public mensaje:string = "mi vieja mula ya no es lo que era";
  public alert:boolean = false;
  public showSpinner:boolean = true;

  constructor(private afAuth: AngularFireAuth, private authSvc: AuthService, private router: Router,
     private barcodeScanner: BarcodeScanner, private ngZone: NgZone)
     {}

  ngOnInit() 
  {
    this.showSpinner = true;

    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);

    this.leer();
  }

  onLogout()
  {
    console.log("Logout"); 
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login'); 
  }

  scannear()
  {
    this.barcodeScanner.scan().then(data =>
      {
        this.codigoScaneado = data.text;
       
          this.cargar();      
          console.log(this.codigoScaneado); 
      })
  }

  cargar()
  {
    switch(this.codigoScaneado)
    {
      case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':
        if(this.cod1 == 0)
        {
          this.creditoTotal = this.creditoTotal + 100;
          this.cod1 = 1;
        }
        else
        {
          this.mensaje = "Ya se uso ese codigo";
          this.alert = true;
        }
        break;
      case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ':
        if(this.cod2 == 0)
        {
          this.creditoTotal = this.creditoTotal + 50;
          this.cod2 = 1;
        }
        else
        {
          this.mensaje = "Ya se uso ese codigo";
          this.alert = true;
        }
        break;
      case '8c95def646b6127282ed50454b73240300dccabc':
        if(this.cod3 == 0)
        {
          this.creditoTotal = this.creditoTotal + 10;
          this.cod3 = 1;
        }
        else
        {
          this.mensaje = "Ya se uso ese codigo";
          this.alert = true;
        }
        break;
      default:
        this.mensaje = "NO ES UN CODIGO VALIDO!!!";
        this.alert = true;
    }
    
    if(this.creditoTotal > 160)
    {
      this.creditoTotal = this.creditoBruto;
      this.mensaje = "Ya se uso ese codigo";
      this.alert = true;
    }
    else
    {
      this.meter();
    }

  }

  borrar()
  {
    this.creditoTotal = 0;
    this.creditoBruto = this.creditoTotal;
    this.cod1 = 0;
    this.cod2 = 0;
    this.cod3 = 0;
    this.meter();
  }

  leer()
  {
    var userId = firebase.auth().currentUser.email;//El mail del usuario actual
    var nombre = userId.split("@", 1);
    let algo = firebase.database().ref('usuarios/' + nombre[0] + '/creditos');
    var retorno = 0

    algo.on('value', (snapshot) => {
      this.creditoTotal = snapshot.val();//Da los creditos
      this.creditoBruto = this.creditoTotal;
    });
  
  }

  meter()
  {//Mete tal cual pero borra lo que habia antes, osea es para hacerlo la primera vez tendria que hacerlo con el usuario
    var userId = firebase.auth().currentUser.email;
    var nombre = userId.split("@", 1);
    
    firebase.database().ref('usuarios/' + nombre[0]).set({
      email: userId,
      creditos: this.creditoTotal
    });

  }

}