import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './componentes/login/login.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { UsuarioListadoComponent } from './componentes/usuario-listado/usuario-listado.component';
import { PaisesComponent } from './componentes/paises/paises.component';
import { HttpClientModule } from '@angular/common/http';

import { MihttpService } from './servicios/mihttp/mihttp.service';
import { PaisesService } from './servicios/paises/paises.service';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioListadoComponent,
    ListadoComponent,
    PaisesComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PaisesService, MihttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
