import { Component } from '@angular/core';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-update-category',
  templateUrl: '../category-list/category-list.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent extends CategoryListComponent {
  override imgSource: string = "../../../../assets/pencil_icon.png"

  constructor(service: CategoryService) {
    super(service)
   }

  override executeAction(category: Category){
    let result = prompt('Qual o novo nome para a categoria?', category.category_name);

    if(result !== null){
      category.category_name = result;
      this.service.update(category).subscribe(() => {
        alert('Categoria atualizada com sucesso')
      })
    }
  }

}
