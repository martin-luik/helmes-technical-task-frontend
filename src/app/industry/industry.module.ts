import { NgModule } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryService } from './categories/category.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryTreeComponent } from './categories/category-tree/category-tree.component';
import { AddCategoryFormComponent } from './categories/add-category-form/add-category-form.component';
import { EditCategoryFormComponent } from './categories/edit-category-form/edit-category-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CategoriesComponent }
]

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryTreeComponent,
    AddCategoryFormComponent,
    EditCategoryFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ]
})
export class IndustryModule { }
