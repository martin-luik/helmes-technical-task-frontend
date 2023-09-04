import {Component, Input} from '@angular/core';
import {Category} from '../model/Category';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent {
  @Input() categories: Category[] = [];
  @Input() position: string | null = null;
  @Input() expandAllCategories = false;

  selectedCategory: Category | null = null;
  selectedPosition: string | null = null;

  constructor(private categoryService: CategoryService) {
    if (!this.categories) {
      this.categories = [];
    }

    this.categoryService.selectedCategory$.subscribe((category) => {
      this.selectedCategory = category;
    });

    this.categoryService.position$.subscribe((position) => {
      this.selectedPosition = position;
    });
  }

  selectCategory(value: Category) {
    this.categoryService.setSelectedCategory(value);
    this.categoryService.setPosition(this.getPosition(value.name));
    value.expanded = !value.expanded;
  }

  getPosition(name: string): string {
    return this.position === null ? name : `${this.position} > ${name}`;
  }

  isCategoryExpanded(expandAll: boolean, category: Category): boolean {
    if (expandAll) {
      category.expanded = false;
      return expandAll;
    }
    return !!category.expanded;
  }
}
