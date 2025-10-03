import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillListComponent } from './components/bills/bill-list/bill-list.component';
import { CreateBillComponent } from './components/bills/create-bill/create-bill.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UpdateBillComponent } from './components/bills/update-bill/update-bill.component';
import { DeleteBillComponent } from './components/bills/delete-bill/delete-bill.component';
import { UpdateCategoryComponent } from './components/categories/update-category/update-category.component';
import { DeleteCategoryComponent } from './components/categories/delete-category/delete-category.component';
import { UnpaidListComponent } from './components/unpaid-list/unpaid-list.component';
import { AnaliseComponent } from './components/analise/analise.component';

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
    path: 'update-bill',
    component: UpdateBillComponent
  },
  {
    path: 'delete-bill',
    component: DeleteBillComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent,
  },
  {
    path: 'add-category',
    component: CreateCategoryComponent,
  },
  {
    path: 'update-category',
    component: UpdateCategoryComponent,
  },
  {
    path: 'delete-category',
    component: DeleteCategoryComponent,
  },
  {
    path: 'unpaid-list',
    component: UnpaidListComponent
  },
  {
    path: 'analise',
    component: AnaliseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
