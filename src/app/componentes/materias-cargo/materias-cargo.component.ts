import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-materias-cargo',
  templateUrl: './materias-cargo.component.html',
  styleUrls: ['./materias-cargo.component.css']
})
export class MateriasCargoComponent implements OnInit {

  @Output() cerrarListaMat: EventEmitter<any> = new EventEmitter<any>();
  @Input() materias: Array<any> = new Array<any>();
  public mats: Array<any> = new Array<any>();

  constructor() { }

  ngOnInit()
  {
    let email:string = firebase.auth().currentUser.email;

    this.materias.forEach(mat =>
      {
        if(mat.profesor == email)
        {
          this.mats.push(mat);
        }
      });
  }

}
