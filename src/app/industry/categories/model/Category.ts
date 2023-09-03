export interface Category {
  id: number;
  relationId: number;
  name: string;
  status: boolean
  childCategories: Category[];
}
