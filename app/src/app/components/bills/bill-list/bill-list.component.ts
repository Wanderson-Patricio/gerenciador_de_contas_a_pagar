import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/bill.model';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css'],
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [
    {
      id: 1,
      bill_description: 'Aluguel',
      bill_value: 900.0,
      is_paid: false,
      payment_date: null,
      due_date: '15-10-2025',
      reference_month: 10,
      reference_year: 2025,
      category_id: 4,
      observations: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
