import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  @Output() cerrarPeli: EventEmitter<any> = new EventEmitter<any>();
  @Input() pelicula: any;

  constructor() { }

  ngOnInit() {
  }

  

}
