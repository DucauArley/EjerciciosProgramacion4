import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.component.html',
  styleUrls: ['./listado-materias.component.css']
})
export class ListadoMateriasComponent implements OnInit {

  @Output() cerrarListaMat: EventEmitter<any> = new EventEmitter<any>();
  @Input() materias: Array<any> = new Array<any>();
  @Input() inscripciones: Array<any> = new Array<any>();
  @Input() usuarios: Array<any> = new Array<any>();
  public mostrarDetalle:boolean = false;

  constructor()
  {
  }

  ngOnInit()
  {
  }

}
