import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../model/Category';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../category.service';
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html'
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

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private translate: TranslateService) {

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
      } as Category).subscribe(
        {
          next: response => {
            this.reloadCategoriesEvent.emit(response);
            this.addCategoryForm.reset();
          },
          complete: () => {
            this.toastr.success(this.translate.instant('industry.categories.form.add.toast.success'));
          },
          error: error => {
            if (error.status === 400) {
              this.serverValidationErrors = error.error.errors;
            } else {
              this.toastr.error(this.translate.instant('industry.categories.form.add.toast.error'));
            }
          }
        }
      );
    }
  }
}
