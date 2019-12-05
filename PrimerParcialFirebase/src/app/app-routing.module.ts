import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrillaPeliculasComponent } from './componentes/grilla-peliculas/grilla-peliculas.component';
import { BotonBorrarComponent } from './componentes/boton-borrar/boton-borrar.component';
import { GrillaEstrellasComponent } from './componentes/grilla-estrellas/grilla-estrellas.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';
import { animation } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componentes/login/login.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { EstrellasPeliculasComponent } from './componentes/estrellas-peliculas/estrellas-peliculas.component';
import { NexoEstrellaComponenteComponent } from './componentes/nexo-estrella-componente/nexo-estrella-componente.component';
import { DetalleComponenteComponent } from './componentes/detalle-componente/detalle-componente.component';


const routes: Routes = [{path: 'grillaPeliculas', component: GrillaPeliculasComponent, data: {animation: 'bienvenidopage'}},
{path: '', component: BienvenidoComponent, data: {animation: 'FilterPage'}},
{path: 'grillaEstrellas', component: GrillaEstrellasComponent},
{path: 'buscador', component: BuscadorComponent, data: {animation: 'loginpage'}},
{path: 'login', component: LoginComponent, data: {animation: 'loginpage'}},
{path: 'estrellaPelicula', component: EstrellasPeliculasComponent, data: {animation: 'loginpage'}},
{path: 'filtroEstrellas', component: NexoEstrellaComponenteComponent, data: {animation: 'loginpage'}},
{path: 'detalleComponente', component: DetalleComponenteComponent, data: {animation: 'loginpage'}}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
