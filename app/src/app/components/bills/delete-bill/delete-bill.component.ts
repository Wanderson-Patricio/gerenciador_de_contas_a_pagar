import { Component } from '@angular/core';
import { BillListComponent } from '../bill-list/bill-list.component';
import { BillService } from 'src/app/services/bill/bill.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Bill } from 'src/app/models/bill.model';

@Component({
  selector: 'app-delete-bill',
  templateUrl: '../bill-list/bill-list.component.html',
  styleUrls: ['../bill-list/bill-list.component.css'],
})
export class DeleteBillComponent extends BillListComponent {
  override imgSource: string = '../../../../assets/trash_can_icon.png';

  constructor(service: BillService, catService: CategoryService) {
    super(service, catService);
  }

  override executeAction(bill: Bill): void {
    let result = confirm(`Deseja realmente excluir a conta de id ${bill.id}?`);
    if (result) {
      this.service.delete(bill).subscribe(() => {
        alert(`Conta de id ${bill.id} deletada com sucesso.`);
        this.loadBills();
      });
    }
  }
}
