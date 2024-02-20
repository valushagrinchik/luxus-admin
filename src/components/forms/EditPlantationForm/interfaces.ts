import {
  ChecksDeliveryMethod,
  CountryCode,
  TermsOfPayment,
} from "../../../lib/types";

export type EditContactInput = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  telegram: string;
  skype: string;
  position: string;
  department: string;
};

export type EditBaseInput = Record<string, any>;

export type EditLegalEntityInput = {
  id: string;
  name: string;
  code: string;
  legalAddress: string;
  actualAddress: string;
  plantationId: string;
};
export type EditTransferDetailsInput = {
  id: string;
  name: string;
  favourite: boolean;
  beneficiary: string;
  beneficiaryAddress?: string;
  documentPath?: any;

  bank: string;
  bankAddress?: string;
  bankAccountNumber: string;
  bankAccountType: string;
  bankSwift?: string;

  correspondentBank?: string;
  correspondentBankAddress?: string;
  correspondentBankAccountNumber?: string;
  correspondentBankSwift?: string;

  // plantationId: string;
  plantationLegalEntityId: string;
};
export type EditCheckInput = {
  id: string;
  name: string;
  favourite: boolean;
  beneficiary: string;
  documentPath?: any;

  // plantationId: string;
  plantationLegalEntityId: string;
};

export type EditPlantationInput = {
  generalInfo: {
    id: string;
    name: string;
    country: CountryCode | string;
    comments: string;
    deliveryMethod: ChecksDeliveryMethod;
    termsOfPayment: TermsOfPayment;
    postpaidCredit?: string;
    postpaidDays?: string;
  };
  transferDetails: EditTransferDetailsInput[];
  checks: EditCheckInput[];
  legalEntities: EditLegalEntityInput[];
  financialContacts: EditContactInput[];
  salesContacts: EditContactInput[];
};

export enum Mode {
  "preview" = "preview",
  "create" = "create",
  "edit" = "edit",
}
