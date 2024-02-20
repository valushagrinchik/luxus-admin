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

export type LegalEntity = {
  actualAddress: string;
  code: string;
  id: number;
  legalAddress: string;
  name: string;
  plantationId: number;
};

export type Plantation = {
  id: number;
  name: string;
  country: CountryCode;
  comments: string;

  deletedAt: string;
  deletedBy: number;
  deliveryMethod: ChecksDeliveryMethod;
  legalEntities: LegalEntity[];
  postpaidCredit: number;
  postpaidDays: number;
  termsOfPayment: TermsOfPayment;
  contacts?: Contact[];

  checks?: Check[];
  transferDetails?: TransferDetails[];
};

type Check = {
  beneficiary: string;
  documentPath?: any;
  favourite: boolean;
  id: number;
  name: string;
  plantationId: number;
  plantationLegalEntityId: number;
};

type TransferDetails = {
  bank: string;
  bankAccountNumber: string;
  bankAccountType: string;
  bankAddress?: string;
  bankSwift?: string;
  beneficiary: string;
  beneficiaryAddress?: string;
  correspondentBank?: string;
  correspondentBankAccountNumber?: string;
  correspondentBankAddress?: string;
  correspondentBankSwift?: string;
  documentPath?: string;
  favourite: boolean;
  id: number;
  name: string;
  plantationId: number;
  plantationLegalEntityId: number;
};

export type Contact = {
  department: string;
  email: string;
  id: number;
  name: string;
  plantationId: number;
  position: string;
  skype: string;
  telegram: string;
  whatsapp: string;
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

export type ListActionType =
  | "update"
  | "cancel"
  | "delete"
  | "admin_refuse"
  | "admin_approve";

export enum CountryCode {
  co = "co",
  ec = "ec",
}

export enum TermsOfPayment {
  PREPAID = "PREPAID",
  PAIDUPONACTUAL = "PAIDUPONACTUAL",
  POSTPAID = "POSTPAID",
}

export enum ChecksDeliveryMethod {
  PERSONALLY = "PERSONALLY",
  SERVIENTREGA = "SERVIENTREGA",
}

export type PlantationFilters = {
  country?: string;
  termsOfPayment?: string[];
};
