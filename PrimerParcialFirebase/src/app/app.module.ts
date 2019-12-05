import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrillaPeliculasComponent } from './componentes/grilla-peliculas/grilla-peliculas.component';
import { BotonBorrarComponent } from './componentes/boton-borrar/boton-borrar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AltaPeliculaComponent } from './componentes/alta-pelicula/alta-pelicula.component';
import { FormsModule } from '@angular/forms';
import { AltaEstrellaComponent } from './componentes/alta-estrella/alta-estrella.component';
import { GrillaEstrellasComponent } from './componentes/grilla-estrellas/grilla-estrellas.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeliculaComponent } from './componentes/pelicula/pelicula.component';
import { LoginComponent } from './componentes/login/login.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { AuthService } from './servicios/auth.service';
import { EstrellasPeliculasComponent } from './componentes/estrellas-peliculas/estrellas-peliculas.component';
import { ModificarEstrellaComponent } from './componentes/modificar-estrella/modificar-estrella.component';
import { NexoEstrellaComponenteComponent } from './componentes/nexo-estrella-componente/nexo-estrella-componente.component';
import { FiltroComponenteComponent } from './componentes/filtro-componente/filtro-componente.component';
import { ListadoEstrellasFiltroComponent } from './componentes/listado-estrellas-filtro/listado-estrellas-filtro.component';

@NgModule({
  declarations: [
    AppComponent,
    GrillaPeliculasComponent,
    BotonBorrarComponent,
    AltaPeliculaComponent,
    AltaEstrellaComponent,
    GrillaEstrellasComponent,
    BuscadorComponent,
    PeliculaComponent,
    LoginComponent,
    BienvenidoComponent,
    EstrellasPeliculasComponent,
    ModificarEstrellaComponent,
    NexoEstrellaComponenteComponent,
    FiltroComponenteComponent,
    ListadoEstrellasFiltroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AuthService, AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
