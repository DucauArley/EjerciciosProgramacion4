import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit {

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

  reproducirAudio(animal: number)
  {
    if(this.ingles == "1")
    {
      switch(animal)
      {
        case 1://leon
          this.audio.src = '../../assets/audios/Lion.m4a';
          break;
        case 2://jirafa
          this.audio.src = '../../assets/audios/Giraffe.m4a';
          break;
        case 3://perro
          this.audio.src = '../../assets/audios/Dog.m4a';
          break;
        case 4://mono
          this.audio.src = '../../assets/audios/Monkey.m4a';
          break;
        case 5://gato
          this.audio.src = '../../assets/audios/Cat.m4a';
          break;    
      }
    }
    else
    {
      if(this.español == "1")
      {
        switch(animal)
        {
          case 1:
            this.audio.src = '../../assets/audios/Leon.m4a';
            break;
          case 2:
            this.audio.src = '../../assets/audios/Jirafa.m4a';
            break;
          case 3:
            this.audio.src = '../../assets/audios/Perro.m4a';
            break;
          case 4:
            this.audio.src = '../../assets/audios/Mono.m4a';
            break;
          case 5:
            this.audio.src = '../../assets/audios/Gato.m4a';
            break;    
        }
      }
      else
      {
        if(this.portugues == "1")
        {
          switch(animal)
          {
            case 1:
              this.audio.src = '../../assets/audios/Leao.m4a';
              break;
            case 2:
              this.audio.src = '../../assets/audios/Girafa.m4a';
              break;
            case 3:
              this.audio.src = '../../assets/audios/Cachorro.m4a';
              break;
            case 4:
              this.audio.src = '../../assets/audios/Macaco.m4a';
              break;
            case 5:
              this.audio.src = '../../assets/audios/Gato.m4a';
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
        document.getElementById("bIngA").classList.remove("borde");
        document.getElementById("bPorA").classList.remove("borde");
        document.getElementById("bEspA").classList.add("borde");
        break;
      case 2://ingles
        this.ingles = "1";
        document.getElementById("bPorA").classList.remove("borde");
        document.getElementById("bEspA").classList.remove("borde");
        document.getElementById("bIngA").classList.add("borde");
        break;
      case 3://portugues
        this.portugues = "1";
        document.getElementById("bEspA").classList.remove("borde");
        document.getElementById("bIngA").classList.remove("borde");
        document.getElementById("bPorA").classList.add("borde");
        break;
    }
  }
}
