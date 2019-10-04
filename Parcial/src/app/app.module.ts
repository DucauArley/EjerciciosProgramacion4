import { GrillaComponent } from './componentes/grilla/grilla.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MihttpService } from './servicios/mihttp.service';
import {PeliculasService } from './servicios/peliculas.service';

@NgModule({
  declarations: [
    AppComponent,
    GrillaComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PeliculasService, MihttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
