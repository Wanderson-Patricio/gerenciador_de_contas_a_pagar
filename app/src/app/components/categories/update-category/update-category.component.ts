import { Component, OnInit } from '@angular/core';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent extends CategoryListComponent {
  override imgSource: string = "../../../../assets/pencil_icon.png"

  constructor(service: CategoryService) {
    super(service)
   }

  override executeAction(category: Category){
    alert('Atualização')
  }

}
