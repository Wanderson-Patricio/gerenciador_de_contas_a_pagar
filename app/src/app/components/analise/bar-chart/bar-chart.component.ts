import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() data: any[] = [];
  colorScheme = {
    domain: ['#A10A28'],
  };

  view: [number, number] = [400, 300];

  constructor() {}

  ngOnInit(): void {}
}
