import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.page.html',
  styleUrls: ['./numeros.page.scss'],
})
export class NumerosPage implements OnInit {

  public audio: any;
  public ingles: string = "0";
  public español: string = "0";
  public portugues: string = "0";

  constructor(private route: ActivatedRoute, private router: Router) 
  {
    this.route.queryParams.subscribe(params=>
      {
        console.log(params);
        this.ingles = params.ingles;
        this.español = params.español;
        this.portugues = params.portugues;

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
      })
    this.audio = new Audio();
  }

  ngOnInit() 
  {
  }

  reproducirAudio(numero: number)
  {
    if(this.ingles == "1")
    {
      switch(numero)
      {
        case 1:
          this.audio.src = '../../assets/audios/One.m4a';
          break;
        case 2:
          this.audio.src = '../../assets/audios/Two.m4a';
          break;
        case 3:
          this.audio.src = '../../assets/audios/Three.m4a';
          break;
        case 4:
          this.audio.src = '../../assets/audios/Four.m4a';
          break;
        case 5:
          this.audio.src = '../../assets/audios/Five.m4a';
          break;    
      }
    }
    else
    {
      if(this.español == "1")
      {
        switch(numero)
        {
          case 1:
            this.audio.src = '../../assets/audios/Uno.m4a';
            break;
          case 2:
            this.audio.src = '../../assets/audios/Dos.m4a';
            break;
          case 3:
            this.audio.src = '../../assets/audios/Tres.m4a';
            break;
          case 4:
            this.audio.src = '../../assets/audios/Cuatro.m4a';
            break;
          case 5:
            this.audio.src = '../../assets/audios/Cinco.m4a';
            break;    
        }
      }
      else
      {
        if(this.portugues == "1")
        {
          switch(numero)
          {
            case 1:
              this.audio.src = '../../assets/audios/Um.m4a';
              break;
            case 2:
              this.audio.src = '../../assets/audios/Dois.m4a';
              break;
            case 3:
              this.audio.src = '../../assets/audios/Tres.m4a';
              break;
            case 4:
              this.audio.src = '../../assets/audios/Cuatro.m4a';
              break;
            case 5:
              this.audio.src = '../../assets/audios/Cinco.m4a';
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
        document.getElementById("bIngN").classList.remove("borde");
        document.getElementById("bPorN").classList.remove("borde");
        document.getElementById("bEspN").classList.add("borde");
        break;
      case 2://ingles
        this.ingles = "1";
        document.getElementById("bPorN").classList.remove("borde");
        document.getElementById("bEspN").classList.remove("borde");
        document.getElementById("bIngN").classList.add("borde");
        break;
      case 3://portugues
        this.portugues = "1";
        document.getElementById("bEspN").classList.remove("borde");
        document.getElementById("bIngN").classList.remove("borde");
        document.getElementById("bPorN").classList.add("borde");
        break;
    }

  }

}
