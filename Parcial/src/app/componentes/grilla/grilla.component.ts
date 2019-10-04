
import { Component, OnInit } from '@angular/core';
import { PeliculasService } from './../../servicios/peliculas.service';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css'],
  providers:  [ PeliculasService ]
})
export class GrillaComponent implements OnInit {

  constructor(private paisesService: PeliculasService)
  {

  }

  public paises = [];

  ngOnInit()
  {
    this.paisesService.BuscarTodos().subscribe(element => this.paises = element);
  }

}
