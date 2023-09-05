import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {of, throwError} from 'rxjs';
import { AddCategoryFormComponent } from './add-category-form.component';
import { Category } from '../model/Category';
import { CategoryService } from '../category.service';

describe('AddCategoryFormComponent', () => {
  let component: AddCategoryFormComponent;
  let fixture: ComponentFixture<AddCategoryFormComponent>;

  const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['addCategory']);
  const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
  const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCategoryFormComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        {provide: CategoryService, useValue: categoryServiceSpy},
        {provide: ToastrService, useValue: toastrServiceSpy},
        {provide: TranslateService, useValue: translateServiceSpy},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryFormComponent);
    component = fixture.componentInstance;
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.addCategoryForm.get('relationId')).toBeTruthy();
    expect(component.addCategoryForm.get('name')).toBeTruthy();
    expect(component.addCategoryForm.get('status')).toBeTruthy();
  });

  it('should patch form values when category is provided', () => {
    const category: Category = { id: 1, name: 'Category 1', relationId:null, status: true, childCategories:[] };
    component.category = category;
    component.ngOnInit();
    expect(component.addCategoryForm.get('relationId')?.value).toEqual(category.id);
  });

  it('should submit the form successfully', () => {
    const formData = {
      relationId: 1,
      name: 'Test Category',
      status: true,
    };
    component.addCategoryForm.setValue(formData);

    const response: Category[] = [{
      id: 1,
      relationId: null,
      name: 'Test Category',
      status: true,
      childCategories: [],
    }];
    categoryServiceSpy.addCategory.and.returnValue(of(response));
    translateServiceSpy.instant.and.returnValue('Success Message');

    component.submitForm();

    expect(categoryServiceSpy.addCategory).toHaveBeenCalledWith(formData);
    expect(component.serverValidationErrors).toEqual([]);
    expect(component.addCategoryForm.value).toEqual({
      relationId: null,
      name: null,
      status: null,
    });
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Success Message');
  });


  it('should handle form submission error', () => {
    const errorResponse = {
      status: 400,
      error: {
        errors: ['error.validation.category.name', 'error.validation.category.status'],
      },
    };

    categoryServiceSpy.addCategory.and.returnValue(throwError(() => errorResponse));

    component.submitForm();

    expect(categoryServiceSpy.addCategory).toHaveBeenCalled();
    expect(component.serverValidationErrors).toEqual(errorResponse.error.errors);
  });
});
