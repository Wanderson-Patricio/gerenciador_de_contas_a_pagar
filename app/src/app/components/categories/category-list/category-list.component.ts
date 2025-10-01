// category-list.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
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
      // Verifica se a quantidade de itens retornados é menor que o limite,
      // o que indica que não há mais páginas.
      this.hasMorePages = categories.length === this.limit;
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCategories(); // Chama a função para buscar a página anterior
    }
  }

  nextPage(): void {
    if (this.hasMorePages) {
      // Verifica se há uma próxima página antes de buscar
      this.currentPage++;
      this.loadCategories(); // Chama a função para buscar a próxima página
    }
  }

  // Novo método para lidar com a mudança do seletor de limite
  onLimitChange(): void {
    this.currentPage = 1; // Reseta a página para a primeira
    this.loadCategories(); // Recarrega a lista com o novo limite
  }
}
