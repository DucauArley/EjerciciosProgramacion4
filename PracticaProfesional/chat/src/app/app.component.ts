import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { timer } from 'rxjs/internal/observable/timer';
import { SpinnerService } from './services/spinner.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  showSplash: Boolean = true;
  showSpinner: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private spinner: SpinnerService,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(5000).subscribe( () => {
        this.showSplash = false;
      });

      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
          if (urlAfterRedirects !== '/home' && urlAfterRedirects !== '/login') {
          }
        });
      });

      this.showSpinner = false;
      this.spinner.observableSpinner().subscribe( x => {
          this.showSpinner = x;
      });

      //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}
