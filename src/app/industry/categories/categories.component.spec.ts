import {CategoriesComponent} from "./categories.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CategoryService} from "./category.service";
import {HttpClientModule} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {of, throwError} from "rxjs";
import {CategoryTreeComponent} from "./category-tree/category-tree.component";
import {Category} from "./model/Category";

enum FormType {
  Add = 'Add',
  Edit = 'Edit',
}

const CATEGORIES: Category[] = [
  {id: 1, name: 'Category 1', relationId: null, status: true, childCategories: []}
]

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
  const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);
  const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['deleteCategory']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent, CategoryTreeComponent],
      imports: [HttpClientModule, TranslateModule.forRoot(),],
      providers: [
        {
          provide: CategoryService, useValue: {
            getCategories: () => of(CATEGORIES),
            deleteCategory: () => of([]),
            selectedCategory$: of(CATEGORIES[0]),
            position$: of(CATEGORIES[0].name),
          }
        },
        {
          provide: ToastrService, useValue: toastrServiceSpy
        },
        {
          provide: TranslateService, useValue: translateServiceSpy
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set ADD formType correctly when selectFromType is called', () => {
    component.selectFromType(FormType.Add, true);
    expect(component.formType).toBe(FormType.Add);
    expect(component.category).toBeNull();
    expect(component.categoryPosition).toBeNull();
  });

  it('should set EDIT formType correctly when selectFromType is called', () => {
    component.selectFromType(FormType.Edit);
    expect(component.formType).toBe(FormType.Edit);
    expect(component.category).toEqual(CATEGORIES[0]);
    expect(component.categoryPosition).toEqual(CATEGORIES[0].name);
  });

  it('should call deleteCategory and update categories on successful deletion', () => {
    categoryServiceSpy.deleteCategory.and.returnValue(of([]));
    translateServiceSpy.instant.and.returnValue('Success Message');

    component.deleteCategory(CATEGORIES[0].id);

    expect(component.categories).toEqual([]);
    expect(component.category).toBeNull();
    expect(component.categoryPosition).toBeNull();
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Success Message');
  });


  it('should call deleteCategory and handle error on failed deletion', () => {
    categoryServiceSpy.deleteCategory.and.returnValue(throwError(() => new Error('Error Message')));
    translateServiceSpy.instant.and.returnValue('Error Message');

    component.deleteCategory(CATEGORIES[0].id);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Error Message');
  });
});
