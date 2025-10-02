import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { Category } from 'src/app/models/category.model';
import { BillService } from 'src/app/services/bill/bill.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css'],
})
export class CreateBillComponent implements OnInit {
  @Input() bill: Bill = {} as Bill;
  category_id: string = '';
  categories: Category[] = [];
  maxCategories: number = 100;

  createBill() {
    this.bill.category_id = parseInt(this.category_id);
    this.bill.is_paid = false;
    this.bill.payment_date = null;
    const [year, month, day] = this.bill.due_date.split('-')
    this.bill.reference_month = parseInt(month);
    this.bill.reference_year = parseInt(year);

    this.service.post(this.bill).subscribe(() => {
      alert('Conta cadastrada com sucesso');
      this.router.navigate(['/bills'])
    })
  }

  constructor(private service: BillService, private catService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.catService.list(1, 100).subscribe((categories) => {
      this.categories = categories;
    })
  }
}
