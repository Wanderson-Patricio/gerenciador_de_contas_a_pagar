import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Importação corrigida
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css'],
})
export class DeleteCategoryComponent implements OnInit {
  @Input() categories: Category[] = [];
  currentPage: number = 1;
  limit: number = 5;

  // Flag para controlar se há mais dados para carregar
  hasMorePages: boolean = true;

  constructor(private service: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Método centralizado para carregar os dados
  loadCategories(): void {
    this.service.list(this.currentPage, this.limit).subscribe((categories) => {
      this.categories = categories;
      this.hasMorePages = categories.length === this.limit;
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCategories();
    }
  }

  nextPage(): void {
    if (this.hasMorePages) {
      this.currentPage++;
      this.loadCategories();
    }
  }

  // Novo método para lidar com a mudança do seletor de limite
  onLimitChange(): void {
    this.currentPage = 1;
    this.loadCategories();
  }

  // --- FUNÇÃO PARA EXECUTAR A EXCLUSÃO REAL (CHAMADA APENAS APÓS A CONFIRMAÇÃO)
  confirmDelete(category: Category): void {
    let result = confirm(
      `Deseja realmente excluir a categoria ${category.category_name}?`
    );
    if (result) {
      this.service.delete(category).subscribe(() => {
        alert(`Categoria ${category.category_name} deletada com sucesso.`);
        this.loadCategories();
      });
    }
  }
}
