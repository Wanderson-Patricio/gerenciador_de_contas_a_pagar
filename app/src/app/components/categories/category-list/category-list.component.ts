import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [
    {
      id: 0,
      category_name: 'internet'
    },
    {
      id: 1,
      category_name: 'energia'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
