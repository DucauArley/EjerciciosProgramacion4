import { GrillaComponent } from './componentes/grilla/grilla.component';

import { animation } from '@angular/animations';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [{path: 'grilla', component: GrillaComponent,},
{path: '', component: GrillaComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
