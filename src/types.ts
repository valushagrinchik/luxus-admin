export type Sort = {
  id: number;
  name: string;
};
export type Category = {
  id: number;
  name: string;
  sorts: Sort[];
};
export type Group = {
  id: number;
  name: string;
  categories: Category[];
};
