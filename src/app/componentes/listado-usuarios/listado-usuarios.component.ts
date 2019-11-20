import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  @Output() cerrarListaUsr: EventEmitter<any> = new EventEmitter<any>();
  @Input() usuarios: Array<any> = new Array<any>();
  public user: Array<any>;
  public tipoUsuario: string = "admin";

  constructor()
  {
  }

  ngOnInit() 
  {
    this.user = new Array<any>();
      switch(this.tipoUsuario)
      {
        case 'admin':
          this.usuarios.forEach(usuario => 
          {
            if(usuario.tipo == "Administrador")
            {
              this.user.push(usuario);
            }
          });
          break;
        case 'alumno':
            this.usuarios.forEach(usuario => 
              {
                if(usuario.tipo == "Alumno")
                {
                  this.user.push(usuario);
                }
              });
          break;
        case 'profesor':
            this.usuarios.forEach(usuario => 
              {
                if(usuario.tipo == "Profesor")
                {
                  this.user.push(usuario);
                }
              });
            break;
        case 'todos':
            this.user = this.usuarios;
            break;
      }

  }

}
