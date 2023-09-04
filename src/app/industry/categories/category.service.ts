import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private selectedCategorySubject = new BehaviorSubject<Category | null>(null);
  private positionSubject = new BehaviorSubject<string | null>(null);
  selectedCategory$: Observable<Category | null> = this.selectedCategorySubject.asObservable();
  position$: Observable<string | null> = this.positionSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  setSelectedCategory(category: Category | null) {
    this.selectedCategorySubject.next(category);
  }

  setPosition(position: string | null) {
    this.positionSubject.next(position);
  }

  getCategories() {
    return this.http.get<Category[]>('/api/categories');
  }

  addCategory(category: Category) {
    return this.http.post<Category[]>('/api/categories', category);
  }

  editCategory(category: Category) {
    return this.http.put<Category[]>('/api/categories', category);
  }

  deleteCategory(id: number) {
    return this.http.delete<Category[]>(`/api/categories/${id}`);
  }
}
