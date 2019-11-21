import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeAlumnoComponent } from './componentes/home-alumno/home-alumno.component';
import { HomeProfeComponent } from './componentes/home-profe/home-profe.component';
import { HomeAdminComponent } from './componentes/home-admin/home-admin.component';
import { InscribirseMateriaComponent } from './componentes/inscribirse-materia/inscribirse-materia.component';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [{path: 'AltaUsuario', component: UsuarioComponent},
{path: '', component: UsuarioComponent},
{path: 'Home', component: HomeComponent , canActivate:[AuthGuard]},
{path: 'Login', component: LoginComponent},
{path: 'HomeAlumno', component: HomeAlumnoComponent, canActivate:[AuthGuard]},
{path: 'HomeProfe', component: HomeProfeComponent, canActivate:[AuthGuard]},
{path: 'HomeAdmin', component: HomeAdminComponent, canActivate:[AuthGuard]}];

//La parte del canactivate es el guard de firebase

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
