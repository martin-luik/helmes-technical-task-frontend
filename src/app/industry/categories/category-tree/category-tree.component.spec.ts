import {CategoryTreeComponent} from "./category-tree.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CategoryService} from "../category.service";
import {of} from "rxjs";

const categoryServiceMock = {
  categories$: of([
    {
      id: 1,
      name: 'Category 1',
      relationId: 2,
      status: true,
      childCategories: [],
      expanded: false,
    }
  ]),
  selectedCategory$: of(null),
  position$: of(null),
  setSelectedCategory: jasmine.createSpy('setSelectedCategory'),
  setPosition: jasmine.createSpy('setPosition'),
};

describe('CategoryTreeComponent', () => {
  let component: CategoryTreeComponent;
  let fixture: ComponentFixture<CategoryTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryTreeComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock }, // Provide the mock service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedCategory and selectedPosition when selectCategory is called', () => {
    const category = {
      id: 1,
      name: 'Category 1',
      relationId: 2,
      status: true,
      childCategories: [],
      expanded: false,
    };
    component.selectCategory(category);
    expect(categoryServiceMock.setSelectedCategory).toHaveBeenCalledWith(category);
    expect(categoryServiceMock.setPosition).toHaveBeenCalledWith(component.getPosition(category.name));
    expect(category.expanded).toBe(true);
  });
});
