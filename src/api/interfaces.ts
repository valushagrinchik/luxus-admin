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
} & CreateSortBody;

export type CreatePlantationBody = {
  name: string;
  country: string;
  comments?: string;
  deliveryMethod: string;
  termsOfPayment: string;
  postpaidCredit?: number;
  postpaidDays?: number;
  legalEntities: LegalEntity[];
  contacts: Contact[];
};

export type UpdatePlantationBody = { id: number } & CreatePlantationBody;

type TransferDetails = {
  name: string;
  favourite: boolean;
  beneficiary: string;
  beneficiaryAddress?: string;
  documentPath?: string;

  bank: string;
  bankAddress?: string;
  bankAccountNumber: string;
  bankAccountType: string;
  bankSwift?: string;

  correspondentBank?: string;
  correspondentBankAddress?: string;
  correspondentBankAccountNumber?: string;
  correspondentBankSwift?: string;
};

type PlantationChecks = {
  name: string;
  favourite: boolean;
  beneficiary: string;
  documentPath?: string;
};

type LegalEntity = {
  name: string;
  code: string;
  legalAddress: string;
  actualAddress: string;

  transferDetails: TransferDetails[];
  checks: PlantationChecks[];
};

type Contact = {
  name: string;
  email: string;
  whatsapp: string;
  telegram: string;
  skype: string;
  position: string;
  department: string;
};
