import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PeliculasService } from './../../servicios/peliculas.service';


@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css']
})
export class BotonComponent implements OnInit {

  @Input() btnPeli: any;
  @Output() recargarGrilla = new EventEmitter<string>();

  constructor(private peliServ: PeliculasService) 
  {

  }

  ngOnInit() {
  }

  Borrar()
  {
    console.log(this.btnPeli);
    if(confirm("Confirma que desea eliminar el producto?")){
      this.peliServ.Borrar(this.btnPeli.id).subscribe(res => {
        console.log(res);
        this.peliServ.BuscarTodos().subscribe(res => {
          this.recargarGrilla.emit(res);
        });
      });
    }



  }

}
