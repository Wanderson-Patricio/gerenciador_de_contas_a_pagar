import { Component, OnInit } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
import { AnaliseInfo } from 'src/app/models/analise.model';
import { Bill } from 'src/app/models/bill.model';
import { Category } from 'src/app/models/category.model';
import { Query } from 'src/app/models/query.model';
import { BillService } from 'src/app/services/bill/bill.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  categories: Category[] = [];
  bills: Bill[] = [];

  monthsData: any[] = [];

  query: Query = {} as Query;
  isFilterApplied: boolean = false;
  totalOfItens: number = 0;

  info: AnaliseInfo = {
    totalItens: 0,
    itensPaid: 0,
    itensNotPaid: 0,
    itensPercentage: 0,
    totalValue: 0,
    totalPaid: 0,
    totalPending: 0,
    paidPercentage: 0,
  };

  constructor(
    public service: BillService,
    public catService: CategoryService
  ) {}

  ngOnInit(): void {
    forkJoin({
      totalOfCat: this.catService.getTotalOfCategories(),
      totalOfItens: this.service.getTotalOfBills(this.query),
    }).subscribe(({ totalOfCat, totalOfItens }) => {
      this.totalOfItens = totalOfItens;

      this.catService.list(1, totalOfCat).subscribe((categories) => {
        this.categories = categories;
        this.loadBills();
      });
    });
  }

  loadBills(): void {
    const query: Query = this.isFilterApplied ? this.query : ({} as Query);
    this.service.list(1, this.totalOfItens, query).subscribe((bills) => {
      this.bills = bills;
      this.updateAnalise();
      this.getMonthsData(query.category_id ? query.category_id : null);
    });
  }

  getCategoryName(id: number | null | undefined): string {
    if (!id) return '';
    let result: string = '';
    this.catService.getById(id).subscribe((category) => {
      result = category.category_name;
    });
    return result;
  }

  applyFilters(): void {
    this.isFilterApplied = true;
    if (this.query.category_id === null) {
      delete this.query.category_id;
    }

    this.service.getTotalOfBills(this.query).subscribe((total) => {
      this.totalOfItens = total;
      this.loadBills();
    });
  }

  updateAnalise(): void {
    this.info.totalItens = this.bills.length;

    this.info.itensPaid = this.bills.filter((bill) => bill.is_paid).length;
    this.info.itensNotPaid = this.bills.filter((bill) => !bill.is_paid).length;

    this.info.itensPercentage =
      this.info.totalItens > 0
        ? Number(
            ((this.info.itensPaid / this.info.totalItens) * 100).toPrecision(2)
          )
        : 0;

    this.info.totalValue =
      this.bills.map((x) => x.bill_value).reduce((acc, cur) => acc + cur, 0) ||
      0;

    this.info.totalPaid =
      this.bills
        .filter((bill) => bill.is_paid)
        .map((x) => x.bill_value)
        .reduce((acc, cur) => acc + cur, 0) || 0;

    this.info.totalPending =
      this.bills
        .filter((bill) => !bill.is_paid)
        .map((x) => x.bill_value)
        .reduce((acc, cur) => acc + cur, 0) || 0;

    this.info.paidPercentage =
      this.info.totalValue > 0
        ? Number(
            ((this.info.totalPaid / this.info.totalValue) * 100).toPrecision(2)
          )
        : 0;
  }

  getMonthsData(category_id: number | null | undefined): void {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    this.monthsData = [];

    const requests = [];

    // Previous year months (after currentMonth)
    for (let month = currentMonth + 1; month <= 12; month++) {
      requests.push(
        this.service.getTotalOfBills({}).pipe(
          switchMap((total) => {
            const query =
              category_id !== null
                ? {
                    category_id,
                    reference_month: month,
                    reference_year: currentYear - 1,
                  }
                : {
                    reference_month: month,
                    reference_year: currentYear - 1,
                  };

            return this.service.list(1, total, query).pipe(
              map((monthBills) => ({
                name: `${month}/${currentYear - 1}`,
                value:
                  monthBills.reduce((acc, x) => acc + x.bill_value, 0) || 0,
              }))
            );
          })
        )
      );
    }

    // Current year months (up to currentMonth)
    for (let month = 1; month <= currentMonth; month++) {
      requests.push(
        this.service.getTotalOfBills({}).pipe(
          switchMap((total) => {
            const query =
              category_id !== null
                ? {
                    category_id,
                    reference_month: month,
                    reference_year: currentYear,
                  }
                : {
                    reference_month: month,
                    reference_year: currentYear,
                  };

            return this.service
              .list(1, total, query)
              .pipe(
                map((monthBills) => ({
                  name: `${month}/${currentYear}`,
                  value:
                    monthBills.reduce((acc, x) => acc + x.bill_value, 0) || 0,
                }))
              );
          })
        )
      );
    }

    forkJoin(requests).subscribe((results) => {
      this.monthsData = results
        .sort((a, b) => {
          const [ma, ya] = a.name.split('/').map(Number);
          const [mb, yb] = b.name.split('/').map(Number);
          return yb - ya || mb - ma;
        })
        .reverse();
    });
  }
}
