import { ReactNode } from "react";

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

export type EditCategoryFormInputs = {
  name: string;
  groupId: string;
};
export type EditSortFormInputs = {
  name: string;
  groupId: string;
  categoryId: string;
};

export type MenuItem = {
  icon?: ReactNode;
  link: string;
  label: string;
  children?: MenuItem[];
};
