import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input("ChartLabels")  doughnutChartLabels: any = [];
  @Input("ChartData")  doughnutChartData: any = [];
  @Input("ChartType")  doughnutChartType: any = '';

  constructor() { }

  ngOnInit() {
    console.log("---------------------------");
    console.log(this.doughnutChartLabels);
  }

}
