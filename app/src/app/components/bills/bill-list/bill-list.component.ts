import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
import { Bill } from 'src/app/models/bill.model';
import { BillService } from 'src/app/services/bill/bill.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css'],
})
export class BillListComponent implements OnInit {
  @Input() bills: Bill[] = [];
  currentPage: number = 1;
  limit: number = 5;

  // Flag para controlar se há mais dados para carregar
  hasMorePages: boolean = true;

  @Input() imgSource: string = '';

  constructor(
    public service: BillService,
    public catService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadBills();
  }

  // Método centralizado para carregar os dados
  loadBills(): void {
    this.service
      .list(this.currentPage, this.limit)
      .pipe(
        // 1. Recebe a lista de contas (bills)
        switchMap((bills: Bill[]) => {
          this.hasMorePages = bills.length === this.limit;

          if (bills.length === 0) {
            return [[]]; // Retorna um Observable de um array vazio se não houver contas
          }

          // 2. Cria um array de Observables para buscar a categoria de cada conta
          const categoryRequests = bills.map((bill) =>
            this.catService.getById(bill.category_id).pipe(
              // Mapeia o resultado para retornar a conta com o nome da categoria anexado
              map((category) => {
                bill.category_name = category.category_name;
                return bill;
              })
            )
          );

          // 3. Usa forkJoin para aguardar que todas as requisições de categoria terminem
          return forkJoin(categoryRequests);
        })
      )
      .subscribe((billsWithCategories: Bill[]) => {
        // 4. Atribui a lista completa (com nomes de categoria) ao seu array
        this.bills = billsWithCategories;
      });
  }

  // REMOVA OU SIMPLIFIQUE o getCategory(bill)
  getCategory(bill: Bill): string | undefined {
    // Agora você só precisa retornar a propriedade que foi preenchida
    return bill.category_name;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBills(); // Chama a função para buscar a página anterior
    }
  }

  nextPage(): void {
    if (this.hasMorePages) {
      // Verifica se há uma próxima página antes de buscar
      this.currentPage++;
      this.loadBills(); // Chama a função para buscar a próxima página
    }
  }

  // Novo método para lidar com a mudança do seletor de limite
  onLimitChange(): void {
    this.currentPage = 1; // Reseta a página para a primeira
    this.loadBills(); // Recarrega a lista com o novo limite
  }

  executeAction(bill: Bill) {}

  billColor(bill: Bill): string {
    return bill.is_paid ? 'green' : 'red';
  }
}
