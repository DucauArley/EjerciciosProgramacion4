import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mostrar-borrado-componente',
  templateUrl: './mostrar-borrado-componente.component.html',
  styleUrls: ['./mostrar-borrado-componente.component.css']
})
export class MostrarBorradoComponenteComponent implements OnInit {

  @Output() recargarGrilla: EventEmitter<string> = new EventEmitter<string>();
  @Input() estrellas: any;
  public estrellasActivas: Array<any>;

  constructor() { }

  ngOnInit()
  {
    this.estrellasActivas = new Array<any>();

    setTimeout(()=>{
    this.estrellas.forEach(est =>
      {
        if(est.activa == 'true')
        {
          this.estrellasActivas.push(est);
        }
    });
  }, 1000);

  }

  cargarPelis($event)
  {
    console.log($event);
    this.estrellasActivas = new Array<any>();
    this.recargarGrilla.emit();
  }

}
