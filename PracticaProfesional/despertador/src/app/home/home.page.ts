import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase'
import { map } from 'rxjs/operators';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe]
})
export class HomePage {

  @ViewChild('mapElement', {static: false}) mapNativeElement: ElementRef;
  @ViewChild('autoCompleteInput', {static: false}) inputNativeElement: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  public spinner:boolean = true;
  public rutaTrackeada = [];
  public pasarDireccion:string;
  public distanciaMinima: number;
  public distanciaTotal:any;
  public destinardo:any;
  public audio: any;
  public rutas: Array<any> = new Array<any>();
  public email:string = firebase.auth().currentUser.email;
  public alert:boolean = false;
  public mensaje:string = "mi vieja mula ya no es lo que era";
  public long;
  public lati;

  currentLocation: any = {
    lat: 0,
    lng: 0
  };

  constructor(private authSvc: AuthService, private router: Router, private afAuth: AngularFireAuth,
    private fb: FormBuilder, public geolocation: Geolocation, private fireStore: AngularFirestore, private datePipe: DatePipe) 
  {
    setTimeout(() => {
      this.spinner = false;
    }, 2000);

    let routes = this.fireStore.collection("rutas").snapshotChanges().subscribe(res=>
      {
        this.tomarRutas(res);
      })

    this.audio = new Audio();
    this.createDirectionForm();
  }

  tomarRutas(res)
  {
    this.rutas = new Array<any>();
    let compare;

    res.forEach(item => 
      {
        compare = item.payload.doc.data();
        if(compare["usuario"] == this.email)
        {
          this.rutas.push(item.payload.doc.data());
        }
    });
  }

  guardarRuta(origen, destino)
  {
    let fecha:any = new Date();
    fecha = this.datePipe.transform(fecha, 'yyyy-MM-dd-H:m:s');
    console.log(fecha);

    this.fireStore.collection("rutas").doc(fecha).set({
      fecha: fecha,
      origen: origen,
      usuario: this.email,
      distancia: Math.floor(this.distanciaTotal - 50),
      destino: destino,
    }).catch(function(error)
    {
      alert("Error al cargar");
    });
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      placeName: [''],
      destination: ['', Validators.required]
    });

  }

  ngAfterViewInit(): void {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
      console.log('latitud actual: ', this.currentLocation.lat + ' longitud actual: ', this.currentLocation.lng);
    });

    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: { lat: -34.609100, lng: -58.370157 },
      zoom: 12
    });

    this.directionsDisplay.setMap(map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    const autocomplete = new google.maps.places.Autocomplete(this.inputNativeElement.nativeElement as HTMLInputElement);
    autocomplete.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No details available for input: ' + place.name);
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      console.log(place.geometry.viewport);
      this.destinardo = place.geometry.viewport;
      marker.setVisible(true);
      let address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      this.pasarDireccion = address;
      infowindow.open(map, marker);
    });

  }

  calculateAndDisplayRoute(formValues) 
  {
    if(this.distanciaMinima !== undefined)
      {
      const that = this;
      var destino= this.pasarDireccion;
      console.log('destino: ', destino)
      this.directionsService.route({
        origin: this.currentLocation,
        destination: destino,
        travelMode: 'WALKING'
      }, (response, status) => {
        if (status === 'OK') {
          that.directionsDisplay.setDirections(response);

          var myLatLngCurrent = new google.maps.LatLng(this.currentLocation);
          console.log('current location lat', myLatLngCurrent);
          
          var myLatLngDestiny = new google.maps.LatLng(this.destinardo.pa.g, this.destinardo.ka.h); 
          console.log('destiny location lat', myLatLngDestiny );

          this.distanciaTotal=google.maps.geometry.spherical.computeDistanceBetween(myLatLngCurrent , myLatLngDestiny);
          console.log('distancia entre puntos: ', this.distanciaTotal - 50);

          this.guardarRuta(this.currentLocation, destino);
          this.startTracking();

        } else {
          this.mensaje = "La direccion no se pudo encontrar";
          this.alert = true;
        }
      });
    }
    else
    {
      this.mensaje = "Se debe ingresar una distancia minima";
      this.alert = true;
    }
  }

  startTracking()
  {
    let options = {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 7000,
    };

    let watch = this.geolocation.watchPosition(options);
    let suscripcion = watch.subscribe((data) => {
      this.lati = data.coords.latitude;
      this.long = data.coords.longitude;

      let lugar =  new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      var myLatLngDestiny = new google.maps.LatLng(this.destinardo.pa.g, this.destinardo.ka.h); 

      this.distanciaTotal=google.maps.geometry.spherical.computeDistanceBetween(lugar , myLatLngDestiny);

      if(this.distanciaMinima + 50 > this.distanciaTotal)
      {
        this.alarma(); //tengo que poner algo que rompa el watch
        suscripcion.unsubscribe();
      }
    });
  }

  reescribirRuta(origen, destino)
  {
    this.directionsService.route({
      origin: origen,
      destination: destino,
      travelMode: 'WALKING'
    }, (response, status) => {
      this.directionsDisplay.setDirections(response);
      console.log(response);
      console.log(status);
    });
  }

  alarma()
  {
    this.audio.src = '../../assets/audios/AlarmaSamsung.mp3';

    if(this.audio.paused)
    {
      this.audio.load();

      this.audio.play();

      setTimeout(() => {
        this.audio.pause();
      }, 8000);

    }
  }

  onLogout()
  {
    console.log("Logout"); 
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login'); 
  }

}
