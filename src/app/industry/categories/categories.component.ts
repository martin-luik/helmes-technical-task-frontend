import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './model/Category';

enum FormType {
  Add = 'Add',
  Edit = 'Edit',
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  categories: Category[] = [];
  category: Category | null = null;
  formType: FormType | null = null;

  categoryPosition: string | null = null;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories()
      .subscribe(response => {
        this.categories = response;
      });

    this.categoryService.selectedCategory$.subscribe((category) => {
      this.category = category;
      this.formType = null;
    });

    this.categoryService.position$.subscribe((position) => {
      this.categoryPosition = position;
    });
  }

  reloadCategories(value: Category[]) {
    this.categories = value;
    this.formType = null;
    this.category = null;
    this.categoryPosition = null;
  }

  selectFromType(value: FormType, reset?: true) {
    this.formType = value;
    if (reset) {
      this.category = null;
      this.categoryPosition = null;
    }
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id)
      .subscribe(response => {
        this.categories = response;
        this.category = null;
        this.categoryPosition = null;
      });
  }

  protected readonly FormType = FormType;
}
