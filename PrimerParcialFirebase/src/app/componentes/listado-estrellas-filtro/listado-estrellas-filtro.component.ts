import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listado-estrellas-filtro',
  templateUrl: './listado-estrellas-filtro.component.html',
  styleUrls: ['./listado-estrellas-filtro.component.css']
})
export class ListadoEstrellasFiltroComponent implements OnInit {

  @Input() estrellas:any;

  constructor() { }

  ngOnInit() {
  }

}
