import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../model/Category';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss']
})
export class AddCategoryFormComponent implements OnInit {
  @Input() category: Category | null = null;
  @Output() reloadCategoriesEvent = new EventEmitter<Category[]>();

  serverValidationErrors: string[] = [];

  addCategoryForm = new FormGroup({
    relationId: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
    status: new FormControl<boolean | null>(null)
  });

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    if (this.category) {
      this.addCategoryForm.patchValue({
        relationId: this.category?.id
      });
    }
  }

  submitForm() {
    if (this.addCategoryForm.valid) {
      const formData = this.addCategoryForm.value;

      this.categoryService.addCategory({
        relationId: formData.relationId,
        name: formData.name,
        status: formData.status
      }).subscribe(
        {
          next: response => {
            this.reloadCategoriesEvent.emit(response);
            this.addCategoryForm.reset();
          },
          error: error => {
            if (error.status === 400) {
              this.serverValidationErrors = error.error.errors;
            } else {
              console.log(error)
            }
          }
        }
      );
    } else {
    }
  }
}
