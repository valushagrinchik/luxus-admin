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
  id: string;
  name: string;
  country: string;
  comments?: string;
  deliveryMethod?: string;
  deliveryInfo?: string;
  termsOfPayment: string;
  postpaidCredit?: string;
  postpaidDays?: string;
  legalEntities: LegalEntity[];
  contacts: Contact[];
};

export type UpdatePlantationBody = CreatePlantationBody;

type TransferDetails = {
  id: string;
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
  id: string;
  name: string;
  favourite: boolean;
  beneficiary: string;
  documentPath?: string;
};

type LegalEntity = {
  id: string;
  name: string;
  code: string;
  legalAddress: string;
  actualAddress: string;

  transferDetails: TransferDetails[];
  checks: PlantationChecks[];
};

type Contact = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  telegram: string;
  skype: string;
  position: string;
  department: string;
};

export type Document = {
  id: number;
  name: string;
};
