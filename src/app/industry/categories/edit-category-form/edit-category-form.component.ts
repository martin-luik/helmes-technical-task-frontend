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
  @Output() reloadCategoriesEvent = new EventEmitter<Category[]>();

  categoriesStack: Category[] = [];
  serverValidationErrors: string[] = [];

  profileForm = new FormGroup({
    id: new FormControl<number | null>(null),
    relationId: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
  });

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    if (this.category) {
      this.profileForm.patchValue({
        id: this.category?.id,
        relationId: this.category?.relationId,
        name: this.category?.name
      });

      this.categoryService.getCategoriesStack().subscribe(response => {
        this.categoriesStack = response;
      });
    }
  }

  submitForm() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;

     this.categoryService.editCategory({
        id: formData.id,
        relationId: formData.relationId,
        name: formData.name,
      }).subscribe({
       next: response => {
         this.reloadCategoriesEvent.emit(response);
         this.profileForm.reset();
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
}
