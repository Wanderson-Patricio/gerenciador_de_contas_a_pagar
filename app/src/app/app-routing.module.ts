import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillListComponent } from './components/bills/bill-list/bill-list.component';
import { CreateBillComponent } from './components/bills/create-bill/create-bill.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'bills',
    component: BillListComponent,
  },
  {
    path: 'add-bill',
    component: CreateBillComponent,
  },
  {
    path: 'categories',
    component: CategoryListComponent,
  },
  {
    path: 'add-category',
    component: CreateCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
