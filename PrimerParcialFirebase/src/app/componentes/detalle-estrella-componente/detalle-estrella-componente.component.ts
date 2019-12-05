import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-estrella-componente',
  templateUrl: './detalle-estrella-componente.component.html',
  styleUrls: ['./detalle-estrella-componente.component.css']
})
export class DetalleEstrellaComponenteComponent implements OnInit {

  @Input() estrellas: any;
  public estrellasNoActivas: Array<any>;

  constructor() { }

  ngOnInit()
  {
    this.estrellasNoActivas = new Array<any>();

    setTimeout(()=>{
    this.estrellas.forEach(est =>
      {
        if(est.activa == 'false')
        {
          this.estrellasNoActivas.push(est);
        }
    });
  }, 1000);

  }

}
