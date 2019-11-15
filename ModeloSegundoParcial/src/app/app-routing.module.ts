import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeAlumnoComponent } from './componentes/home-alumno/home-alumno.component';
import { HomeProfeComponent } from './componentes/home-profe/home-profe.component';
import { HomeAdminComponent } from './componentes/home-admin/home-admin.component';



const routes: Routes = [{path: 'AltaUsuario', component: UsuarioComponent},
{path: '', component: UsuarioComponent},
{path: 'Home', component: HomeComponent},
{path: 'Login', component: LoginComponent},
{path: 'HomeAlumno', component: HomeAlumnoComponent},
{path: 'HomeProfe', component: HomeProfeComponent},
{path: 'HomeAdmin', component: HomeAdminComponent}];

//La parte del canactivate es el guard de firebase

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
