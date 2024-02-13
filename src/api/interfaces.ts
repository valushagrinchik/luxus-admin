export type UpdateCategoryBody = {
  id: number;
  name: string;
  groupId: number;
};
export type CreateCategoryBody = {
  name: string;
  groupId: number;
};

export type UpdateGroupBody = {
  id: number;
  name: string;
};
export type CreateGroupBody = {
  name: string;
};

export type CreateSortBody = {
  name: string;
  categoryId: number;
};
export type UpdateSortBody = {
  id: number;
  name: string;
  categoryId: number;
};
