import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-chart',
  templateUrl: './pizza-chart.component.html',
  styleUrls: ['./pizza-chart.component.css'],
})
export class PizzaChartComponent implements OnInit {
  @Input() paidValue: number = 0;
  @Input() pendingValue: number = 0;

  get chartData() {
    return [
      { name: 'Pago', value: this.paidValue },
      { name: 'Pendente', value: this.pendingValue },
    ];
  }

  view: [number, number] = [400, 300];
  colorScheme = {
    domain: ['#4CAF50', '#F44336'],
  };

  constructor() {}

  ngOnInit(): void {}
}
