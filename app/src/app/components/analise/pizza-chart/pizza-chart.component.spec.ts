import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaChartComponent } from './pizza-chart.component';

describe('PizzaChartComponent', () => {
  let component: PizzaChartComponent;
  let fixture: ComponentFixture<PizzaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
