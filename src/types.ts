export type Sort = {
  id: number;
  name: string;
  deletedAt: string;
  categoryId: number;
};
export type Category = {
  id: number;
  name: string;
  groupId: number;
  deletedAt: string;
  sorts: Sort[];
};
export type Group = {
  id: number;
  name: string;
  deletedAt: string;
  categories: Category[];
};
export type User = {
  id: number;
  email: string;
  access_token: string;
};
