import {NgModule} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {HttpClientModule} from '@angular/common/http';
import {CategoryTreeComponent} from './categories/category-tree/category-tree.component';
import {AddCategoryFormComponent} from './categories/add-category-form/add-category-form.component';
import {EditCategoryFormComponent} from './categories/edit-category-form/edit-category-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  { path: '', component: CategoriesComponent }
]

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryTreeComponent,
    AddCategoryFormComponent,
    EditCategoryFormComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    TranslateModule,
  ]
})
export class IndustryModule { }
