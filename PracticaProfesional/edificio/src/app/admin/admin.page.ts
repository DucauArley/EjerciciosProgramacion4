import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  @ViewChild('barCanvas', {static: false}) barCanvas: ElementRef;
  @ViewChild('doughnutCanvas', {static: false}) doughnutCanvas: ElementRef;

  public spinner:boolean = true;
  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  public imagenes: Array<string>;
  public votos: Array<number>;
  public tipoImg: string;
  public imgT: boolean = false;

  constructor(private route: ActivatedRoute)
  {
    setTimeout(() => {
      this.spinner = false;
    }, 2000);

  }

  ngOnInit() {

    this.route.queryParams.subscribe(params=>
      {
        this.tipoImg = params.tipoImg;
        console.log(params);

        this.leer(this.tipoImg);

        if(this.tipoImg == "feas")
        {
          this.imgT = true;
        }
        else
        {
          this.imgT = false;
        }
      })

    setTimeout(() => {
      if(this.tipoImg == "feas")
      {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: "bar",
          data: {
            labels: this.imagenes,
            datasets: [
              {
                label: "# of Votes",//Creo que aca tendria que ir la imagen para mostrar
                data: this.votos,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)", 
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)", 
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
      else
      {
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
          type: "doughnut",//Creo que podria reducir este codigo mandandole el type por param porque son lo mismo
          data: {
            labels: this.imagenes,
            datasets: [
              {
                label: "# of Votes",
                data: this.votos,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)"
                ],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
              }
            ]
          }
        });
      }
    
  /*(chartHover)="chartHovered($event)" Creo que tiene que ver con esto lo de mostrar la foto
  (chartClick)="chartClicked($event)">*/
  }, 500);
  }

  leer(tipo: string)
  {
    var userId = firebase.auth().currentUser.email;//El mail del usuario actual
    var nombre = userId.split("@", 1);
    let algo = firebase.database().ref('imagenes/' + tipo);
    var retorno;

    algo.on('value', snapshot => {
      retorno = snapshot.val();

      this.votos = new Array<number>();
      this.imagenes = new Array<string>();

      for(var data in retorno)
      {
        this.votos.push(retorno[data]["likes"]);
        this.imagenes.push(data);
      }

    });
    
  }

}
