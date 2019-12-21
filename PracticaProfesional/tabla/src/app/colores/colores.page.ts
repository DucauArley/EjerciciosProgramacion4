import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.page.html',
  styleUrls: ['./colores.page.scss'],
})
export class ColoresPage implements OnInit {
  public spinner:boolean = true;
  public audio: any;
  public ingles: string = "0";
  public español: string = "0";
  public portugues: string = "0";

  constructor(private route: ActivatedRoute, private router: Router) 
  {
    setTimeout(() => {
      this.spinner = false;
    }, 2000);

    this.route.queryParams.subscribe(params=>
      {
        this.ingles = params.ingles;
        this.español = params.español;
        this.portugues = params.portugues;
        this.audio = new Audio();

        if(this.ingles == "1")
        {
          this.cambiarNombres(2);
        }

        if(this.español == "1")
        {
          this.cambiarNombres(1);
        }

        if(this.portugues == "1")
        {
          this.cambiarNombres(3);
        }

      });
  }

  ngOnInit() 
  {
  }

  reproducirAudio(color: number)
  {
    if(this.ingles == "1")
    {
      switch(color)
      {
        case 1://rojo
          this.audio.src = '../../assets/audios/Red.m4a';
          break;
        case 2://azul
          this.audio.src = '../../assets/audios/Blue.m4a';
          break;
        case 3://verde
          this.audio.src = '../../assets/audios/Green.m4a';
          break;
        case 4://amarillo
          this.audio.src = '../../assets/audios/Yellow.m4a';
          break;
        case 5://naranja
          this.audio.src = '../../assets/audios/Orange.m4a';
          break;    
      }
    }
    else
    {
      if(this.español == "1")
      {
        switch(color)
        {
          case 1:
            this.audio.src = '../../assets/audios/Rojo.m4a';
            break;
          case 2:
            this.audio.src = '../../assets/audios/Azul.m4a';
            break;
          case 3:
            this.audio.src = '../../assets/audios/Verde.m4a';
            break;
          case 4:
            this.audio.src = '../../assets/audios/Amarillo.m4a';
            break;
          case 5:
            this.audio.src = '../../assets/audios/Naranja.m4a';
            break;    
        }
      }
      else
      {
        if(this.portugues == "1")
        {
          switch(color)
          {
            case 1:
              this.audio.src = '../../assets/audios/Vermelho.m4a';
              break;
            case 2:
              this.audio.src = '../../assets/audios/Azulp.m4a';
              break;
            case 3:
              this.audio.src = '../../assets/audios/Verdep.m4a';
              break;
            case 4:
              this.audio.src = '../../assets/audios/Amarelo.m4a';
              break;
            case 5:
              this.audio.src = '../../assets/audios/Laranja.m4a';
              break;    
          }
        }
      }
    }

    if(this.audio.paused)
    {
      this.audio.load();

      this.audio.play();
    }
  }

  resetear()
  {
    this.ingles = "0";
    this.español = "0";
    this.portugues = "0";
  }

  cambiarNombres(idioma: number)
  {
    this.resetear();
    switch(idioma)
    {
      case 1://español
        this.español = "1";
        document.getElementById("bIngC").classList.remove("borde");
        document.getElementById("bPorC").classList.remove("borde");
        document.getElementById("bEspC").classList.add("borde");
        break;
      case 2://ingles
        this.ingles = "1";
        document.getElementById("bPorC").classList.remove("borde");
        document.getElementById("bEspC").classList.remove("borde");
        document.getElementById("bIngC").classList.add("borde");
        break;
      case 3://portugues
        this.portugues = "1";
        document.getElementById("bEspC").classList.remove("borde");
        document.getElementById("bIngC").classList.remove("borde");
        document.getElementById("bPorC").classList.add("borde");
        break;
    }

  }


}
