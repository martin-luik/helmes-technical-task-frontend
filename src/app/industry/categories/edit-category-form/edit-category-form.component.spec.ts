import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditCategoryFormComponent} from './edit-category-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "../category.service";
import {ToastrService} from "ngx-toastr";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {of, throwError} from "rxjs";
import {Category} from "../model/Category";

describe('EditCategoryFormComponent', () => {
  let component: EditCategoryFormComponent;
  let fixture: ComponentFixture<EditCategoryFormComponent>;

  const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['editCategory']);
  const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
  const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCategoryFormComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        {provide: CategoryService, useValue: categoryServiceSpy},
        {provide: ToastrService, useValue: toastrServiceSpy},
        {provide: TranslateService, useValue: translateServiceSpy},
      ],
    });

    fixture = TestBed.createComponent(EditCategoryFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.editCategoryForm.get('relationId')).toBeTruthy();
    expect(component.editCategoryForm.get('name')).toBeTruthy();
  });

  it('should submit the form successfully', () => {
    const formData = {
      id: 11,
      relationId: null,
      name: 'Test Category',
    };
    component.editCategoryForm.setValue(formData);

    const response: Category[] = [{
      id: 11,
      relationId: null,
      name: 'Test Category',
      status: true,
      childCategories: [],
    }];
    categoryServiceSpy.editCategory.and.returnValue(of(response));
    translateServiceSpy.instant.and.returnValue('Success Message');

    component.submitForm();

    expect(categoryServiceSpy.editCategory).toHaveBeenCalledWith(formData);
    expect(component.serverValidationErrors).toEqual([]);
    expect(component.editCategoryForm.value).toEqual({
      id: null,
      relationId: null,
      name: null,
    });
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Success Message');
  });

  it('should handle form submission error', () => {
    const errorResponse = {
      status: 400,
      error: {
        errors: ['error.validation.category.name'],
      },
    };

    categoryServiceSpy.editCategory.and.returnValue(throwError(() => errorResponse));

    component.submitForm();

    expect(categoryServiceSpy.editCategory).toHaveBeenCalled();
    expect(component.serverValidationErrors).toEqual(errorResponse.error.errors);
  });
});
