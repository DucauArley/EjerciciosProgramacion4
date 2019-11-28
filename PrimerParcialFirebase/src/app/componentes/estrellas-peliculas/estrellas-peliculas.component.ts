import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estrellas-peliculas',
  templateUrl: './estrellas-peliculas.component.html',
  styleUrls: ['./estrellas-peliculas.component.css']
})
export class EstrellasPeliculasComponent implements OnInit {

  public imagen:FileList;

  constructor() { }

  ngOnInit() {
  }


  image()
  {
    console.log(document.getElementById("myFile"));
  }

  onChange($event)
  {
    console.log($event);
  }



}
