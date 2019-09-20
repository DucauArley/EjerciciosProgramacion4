import { animation } from '@angular/animations';
import { Usuario } from './clases/usuario';
import { LoginComponent } from './componentes/login/login.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';
import { UsuarioListadoComponent } from './componentes/usuario-listado/usuario-listado.component';
import { PaisesComponent } from './componentes/paises/paises.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [{path: 'inicio', component: BienvenidoComponent, data: {animation: 'bienvenidopage'}},
{path: 'login', component: LoginComponent, data: {animation: 'loginpage'}},
{path: '', component: UsuarioListadoComponent},
{ path: 'paises', component: PaisesComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
