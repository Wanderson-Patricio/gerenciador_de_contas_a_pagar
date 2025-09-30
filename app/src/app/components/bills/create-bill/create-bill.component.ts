import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/bill.model';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {
  bill: Bill = {} as Bill;

  createBill(){
    alert(JSON.stringify(this.bill))
  }

  constructor() { }

  ngOnInit(): void {
  }

}
