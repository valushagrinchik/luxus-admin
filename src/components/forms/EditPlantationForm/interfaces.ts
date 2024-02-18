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
};
export type EditTransferDetailsInput = {
  id: string;
  name: string;
  favourite: boolean;
  beneficiary: string;
  beneficiaryAddress: string;
  documentPath: string;

  bank: string;
  bankAddress: string;
  bankAccountNumber: string;
  bankAccountType: string;
  bankSwift: string;

  correspondentBank: string;
  correspondentBankAddress: string;
  correspondentBankAccountNumber: string;
  correspondentBankSwift: string;
};
export type EditCheckInput = {
  id: string;
  name: string;
  favourite: boolean;
  beneficiary: string;
  documentPath: string;
};
export type EditPlantationInput = {
  generalInfo: {
    id: string;
    name: string;
    country: string;
    comments: string;
    deliveryMethod: string;
    termsOfPayment: string;
    postpaidCredit: string;
    postpaidDays: string;
  };
  transferDetails: EditTransferDetailsInput[];
  checks: EditCheckInput[];
  legalEntities: EditLegalEntityInput[];
  financialContacts: EditContactInput[];
  salesContacts: EditContactInput[];
};

export type EditPlantationFormMode = "preview" | "create" | "edit";
