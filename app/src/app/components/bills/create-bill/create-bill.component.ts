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
  @Input() bill: Bill = {
    bill_value: 0.0,
  } as Bill;
  category_id: string = '';
  categories: Category[] = [];
  maxCategories: number = 100;

  formattedValue: string = 'R$ 0,00';
  lastKeyPressed: string = '';

  onInputChange(event: Event) {
    if (this.bill.bill_value === 0.0 && this.lastKeyPressed === 'Backspace') {
      this.bill.bill_value = 0.0;
      this.formattedValue = 'R$ 0,00';
    } else {
      const input = event.target as HTMLInputElement;

      // Remove tudo que não for número
      const numeric = input.value.replace(/\D/g, '');

      // Converte para centavos
      const value = parseFloat(numeric) / 100;
      // Atualiza o valor real
      this.bill.bill_value = value;

      // Formata como moeda brasileira
      this.formattedValue = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }
  }

  onKeyDown(event: KeyboardEvent) {
    this.lastKeyPressed = event.key;
  }

  createBill() {
    this.bill.category_id = parseInt(this.category_id);
    this.bill.is_paid = false;
    this.bill.payment_date = null;
    const [year, month, day] = this.bill.due_date.split('-');
    this.bill.reference_month = parseInt(month);
    this.bill.reference_year = parseInt(year);

    this.service.post(this.bill).subscribe(() => {
      alert('Conta cadastrada com sucesso');
      this.router.navigate(['/bills']);
    });
  }

  constructor(
    private service: BillService,
    private catService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let totalOfCategories: number = 100;
    this.catService.getTotalOfCategories().subscribe((totalOfCat) => {
      totalOfCategories = totalOfCat;
    })

    this.catService.list(1, totalOfCategories).subscribe((categories) => {
      this.categories = categories;
    });
  }
}
