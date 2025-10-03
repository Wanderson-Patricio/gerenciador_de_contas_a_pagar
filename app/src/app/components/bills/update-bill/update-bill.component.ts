import { Component } from '@angular/core';
import { BillListComponent } from '../bill-list/bill-list.component';
import { BillService } from 'src/app/services/bill/bill.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Bill } from 'src/app/models/bill.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-bill',
  templateUrl: '../bill-list/bill-list.component.html',
  styleUrls: ['../bill-list/bill-list.component.css'],
})
export class UpdateBillComponent extends BillListComponent {
  override imgSource: string = '../../../../assets/check_icon.png';

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

  override executeAction(bill: Bill): void {
    let result = confirm(`A conta de id ${bill.id} foi paga?`);

    if (result) {
      bill.is_paid = true;
      bill.payment_date = new Date()
        .toLocaleString()
        .split(',')[0]
        .split('/')
        .reverse()
        .join('-');
      this.service.update(bill).subscribe(() => {
        alert(`Conta de id ${bill.id} paga com sucesso.`);
      });
    }
  }
}
