import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';
import { UpdateCategoryComponent } from './components/categories/update-category/update-category.component';
import { DeleteCategoryComponent } from './components/categories/delete-category/delete-category.component';
import { FormsModule } from '@angular/forms';
import { CreateBillComponent } from './components/bills/create-bill/create-bill.component';
import { UpdateBillComponent } from './components/bills/update-bill/update-bill.component';
import { DeleteBillComponent } from './components/bills/delete-bill/delete-bill.component';
import { BillListComponent } from './components/bills/bill-list/bill-list.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { UnpaidListComponent } from './components/unpaid-list/unpaid-list.component';
import { AnaliseComponent } from './components/analise/analise.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    CreateBillComponent,
    UpdateBillComponent,
    DeleteBillComponent,
    BillListComponent,
    CategoryListComponent,
    HomepageComponent,
    UnpaidListComponent,
    AnaliseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
