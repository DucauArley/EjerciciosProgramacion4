import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Flashlight, DeviceMotion, Vibration]
})
export class HomePage {

  public activo: boolean = false;
  public audio: any;
  public data: any;
  public subscription: any;

  constructor(private authSvc: AuthService, private router: Router, private afAuth: AngularFireAuth,
     private flashlight: Flashlight, private deviceMotion: DeviceMotion, private vibration: Vibration) 
  {
    this.activo = false;
    this.audio = new Audio();
  }

  onLogout()
  {
    console.log("Logout"); 
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login'); 
  }

  activar()
  {

    this.activo = true;

    let seMueveXD = false;
    let seMueveXI = false;
    let seMueveY = false;

    this.subscription = this.deviceMotion.watchAcceleration({frequency:200}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.data = acceleration;

      if((this.data.x > 5.0 || this.data.x < -5.0) && (seMueveXD == false || seMueveXI == false))
      {
        if(seMueveXD == false && this.data.x > 5.0)
        {
          seMueveXD = true;
          this.audio.src = '../../assets/audios/Meroban.m4a';

          if(this.audio.paused)
          {
            this.audio.load();

            this.audio.play();
          }
        }

        if(seMueveXI == false && this.data.x < -5.0)
        {
          seMueveXI = true;
          this.audio.src = '../../assets/audios/NoToques.m4a';

          if(this.audio.paused)
          {
            this.audio.load();

            this.audio.play();
          }
        }


      }

      if((this.data.y > 5.0 || this.data.y < -5.0) && seMueveY == false)
      {
        seMueveY = true;
        this.flashlight.switchOn();

        timer(5000).subscribe(() => 
        {
          this.audio.src = '../../assets/audios/alarmaFabrica.mp3';
         
          this.audio.load();

          this.audio.play();

          this.flashlight.switchOff();
        });

      }

      if((this.data.x < 5.0 && this.data.y < 5.0) && seMueveY == true && seMueveXD == true && seMueveXI == true)
      {
        seMueveXD = false;
        seMueveXI = false;
        seMueveY = false; 
        this.audio.src = '../../assets/audios/alarmaAuto.mp3';

        if(this.audio.paused)
        {
          this.audio.load();

          this.audio.play();
        }
        
        this.vibration.vibrate(5000);
      }

    });

  }

  desactivar()
  {
    this.activo = false;
    this.subscription.unsubscribe();
  }
  
}
