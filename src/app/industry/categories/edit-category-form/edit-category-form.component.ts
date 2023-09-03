import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../model/Category';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-edit-category-form',
  templateUrl: './edit-category-form.component.html',
  styleUrls: ['./edit-category-form.component.scss']
})
export class EditCategoryFormComponent implements OnInit {
  @Input() category: Category | null = null;
  @Input() categories: Category[] = [];
  @Output() reloadCategoriesEvent = new EventEmitter<Category[]>();

  serverValidationErrors: string[] = [];
  flattenedCategories: any[] = [];


  editCategoryForm = new FormGroup({
    id: new FormControl<number | null>(null),
    relationId: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
  });

  tempCategories: Category[] = [];

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    if (this.category) {
      this.editCategoryForm.patchValue({
        id: this.category?.id,
        relationId: this.category?.relationId,
        name: this.category?.name
      });
    }
    this.flattenCategories(this.categories, this.category);
  }

  submitForm() {
    if (this.editCategoryForm.valid) {
      const formData = this.editCategoryForm.value;

     this.categoryService.editCategory({
        id: formData.id,
        relationId: formData.relationId,
        name: formData.name,
      }).subscribe({
       next: response => {
         this.reloadCategoriesEvent.emit(response);
         this.editCategoryForm.reset();
       },
        error: error => {
          if (error.status === 400) {
            this.serverValidationErrors = error.error.errors;
          } else {
            console.log(error)
          }
        }
     });
    } else {
    }
  }

  flattenCategories(categories: any[], selectedCategory: Category | null = null) {
    for (const category of categories) {
      if (selectedCategory && category.relationId === selectedCategory.id) {
        continue;
      }
      this.flattenedCategories.push(category);
      if (category.childCategories && category.childCategories.length > 0) {
        this.flattenCategories(category.childCategories, selectedCategory);
      }
    }
  }
}
