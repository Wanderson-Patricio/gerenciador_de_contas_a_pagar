import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/bill.model';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css'],
})
export class CreateBillComponent implements OnInit {
  bill: Bill = {} as Bill;
  category_id: string = '';

  createBill() {
    this.bill.category_id = parseInt(this.category_id);
    this.bill.is_paid = false;
    this.bill.payment_date = null;
    const [year, month, day] = this.bill.due_date.split('-')
    this.bill.reference_month = parseInt(month);
    this.bill.reference_year = parseInt(year);

    alert(JSON.stringify(this.bill));
  }

  constructor() {}

  ngOnInit(): void {}
}
