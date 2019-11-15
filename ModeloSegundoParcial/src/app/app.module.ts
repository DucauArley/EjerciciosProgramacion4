import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage'
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './servicios/auth.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeAlumnoComponent } from './componentes/home-alumno/home-alumno.component';
import { HomeProfeComponent } from './componentes/home-profe/home-profe.component';
import { HomeAdminComponent } from './componentes/home-admin/home-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    HomeComponent,
    LoginComponent,
    HomeAlumnoComponent,
    HomeProfeComponent,
    HomeAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AuthService, AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
