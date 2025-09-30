import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  category: Category = {} as Category;

  createCategory(){
    alert(`Categoria: ${this.category.category_name}`)
  }

  constructor() {}

  ngOnInit(): void {}
}
