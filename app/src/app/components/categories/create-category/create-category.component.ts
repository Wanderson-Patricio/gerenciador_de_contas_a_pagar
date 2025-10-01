import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  @Input() category: Category = {} as Category;

  createCategory(){
    this.service.post(this.category).subscribe(() => {
      alert('Categoria adicionada com sucesso.')
      this.router.navigate(['/categories'])
    });
  }

  constructor(private service: CategoryService, private router: Router) {}

  ngOnInit(): void {}
}
