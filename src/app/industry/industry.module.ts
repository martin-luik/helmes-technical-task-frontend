import { NgModule } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CategoryTreeComponent } from './categories/category-tree/category-tree.component';
import { AddCategoryFormComponent } from './categories/add-category-form/add-category-form.component';
import { EditCategoryFormComponent } from './categories/edit-category-form/edit-category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

const routes: Routes = [
  { path: '', component: CategoriesComponent }
]

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    NgIf,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),
  ]
})
export class IndustryModule { }
