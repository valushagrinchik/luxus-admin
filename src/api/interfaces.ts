export type UpdateCategoryBody = {
  id: number;
  name: string;
  groupId: number;
};
export type CreateCategoryBody = {
  name: string;
  groupId: number;
};

export type SearchParams = {
  name?: string;
};
