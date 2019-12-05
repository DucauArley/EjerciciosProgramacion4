import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-componente',
  templateUrl: './filtro-componente.component.html',
  styleUrls: ['./filtro-componente.component.css']
})
export class FiltroComponenteComponent implements OnInit {

  @Output() cambioNacionalidad: EventEmitter<any> = new EventEmitter<any>();
  @Input() estrellas: any;
  public nacionalidad:string = "Uruguayo";

  constructor() { }

  ngOnInit() {
  }

  cambioSelect()
  {
    this.cambioNacionalidad.emit(this.nacionalidad);
  }

}
