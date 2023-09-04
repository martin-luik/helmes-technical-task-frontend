import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Category, FlattenedCategories} from '../model/Category';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../category.service';
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

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
  flattenedCategories: FlattenedCategories[] = [];


  editCategoryForm = new FormGroup({
    id: new FormControl<number | null>(null),
    relationId: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
  });

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private translate: TranslateService) {

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
      } as Category).subscribe({
       next: response => {
         this.reloadCategoriesEvent.emit(response);
         this.editCategoryForm.reset();
       },
       complete: () => {
         this.toastr.success(this.translate.instant('industry.categories.form.edit.toast.success'));
       },
        error: error => {
          if (error.status === 400) {
            this.serverValidationErrors = error.error.errors;
          } else {
            this.toastr.error(this.translate.instant('industry.categories.form.edit.toast.error'));
          }
        }
     });
    }
  }

  flattenCategories(categories: Category[], selectedCategory: Category | null = null, parentCategory: Category | null = null, position = '') {
    for (const category of categories) {
      if (selectedCategory && (category.id === selectedCategory.id || (parentCategory && category.id === parentCategory.id))) {
        continue;
      }

      const calculatedPosition = position ? `${position} > ${category.name}` : category.name;

      const categoryWithPosition = { ...category, position: calculatedPosition };

      this.flattenedCategories.push(categoryWithPosition as FlattenedCategories);
      if (category.childCategories && category.childCategories.length > 0) {
        this.flattenCategories(category.childCategories, selectedCategory, category, calculatedPosition);
      }
    }
  }
}
