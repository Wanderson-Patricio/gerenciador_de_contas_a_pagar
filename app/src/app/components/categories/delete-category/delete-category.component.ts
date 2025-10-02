import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Importação corrigida
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-delete-category',
  templateUrl: '../category-list/category-list.component.html',
  styleUrls: ['./delete-category.component.css'],
})
export class DeleteCategoryComponent extends CategoryListComponent {

  override imgSource: string = "../../../../assets/trash_can_icon.png"

  constructor(service: CategoryService){
    super(service);
  }

  // --- FUNÇÃO PARA EXECUTAR A EXCLUSÃO REAL (CHAMADA APENAS APÓS A CONFIRMAÇÃO)
  override executeAction(category: Category): void {
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
