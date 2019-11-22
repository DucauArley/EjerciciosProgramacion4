import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.component.html',
  styleUrls: ['./detalle-materia.component.css']
})
export class DetalleMateriaComponent implements OnInit {

  @Input() img:string;
  @Input() nombre:string;
  @Input() inscripciones: Array<any> = new Array<any>();
  @Input() usuarios: Array<any> = new Array<any>();
  public inscrip: Array<any> = new Array<any>();


  constructor() { }

  ngOnInit()
  {
    this.usuarios.forEach(usr=>
    {
      this.inscripciones.forEach(ins=>
        {
          if(ins.nombre == this.nombre && usr.email == ins.alumno)
          {
            this.inscrip.push(ins);
          }
        });
    })
    console.log(this.inscrip);
  }

}
