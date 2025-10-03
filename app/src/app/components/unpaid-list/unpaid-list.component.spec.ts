import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidListComponent } from './unpaid-list.component';

describe('UnpaidListComponent', () => {
  let component: UnpaidListComponent;
  let fixture: ComponentFixture<UnpaidListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpaidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
