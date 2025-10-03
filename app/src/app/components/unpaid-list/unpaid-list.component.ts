import { Component } from '@angular/core';
import { BillService } from 'src/app/services/bill/bill.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Bill } from 'src/app/models/bill.model';
import { Router } from '@angular/router';
import { BillListComponent } from '../bills/bill-list/bill-list.component';

@Component({
  selector: 'app-unpaid-list',
  templateUrl: '../bills/bill-list/bill-list.component.html',
  styleUrls: ['../bills/bill-list/bill-list.component.css'],
})
export class UnpaidListComponent extends BillListComponent {
  override imgSource: string = '';

  constructor(
    service: BillService,
    catService: CategoryService,
    router: Router
  ) {
    super(service, catService, router);
  }

  override ngOnInit(): void {
    this.query.is_paid = false;
    this.applyFilters();
    super.ngOnInit();
  }

  override executeAction(bill: Bill): void {}
}
