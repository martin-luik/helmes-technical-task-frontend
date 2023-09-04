export interface Category {
  id: number;
  relationId: number;
  name: string;
  status: boolean
  childCategories: Category[];
  expanded?: boolean;
}

export interface FlattenedCategories {
  id: number;
  relationId: number;
  name: string;
  status: boolean
  childCategories: FlattenedCategories[];
  position: string;
}
