import {
  EditPlantationInput,
  EditTransferDetailsInput,
} from "../components/forms/EditPlantationForm/interfaces";
import { ErrorMessages } from "./constants";
import * as yup from "yup";

export const schemaLogin = yup
  .object()
  .shape({
    email: yup
      .string()
      .email(ErrorMessages.invalidEmail)
      .required(ErrorMessages.reqiuredField),
    password: yup.string().required(ErrorMessages.reqiuredField),
  })
  .required();
export const schemaEditGroup = yup
  .object()
  .shape({
    name: yup.string().required(ErrorMessages.reqiuredField),
  })
  .required();

export const schemaEditCategory = yup
  .object()
  .shape({
    name: yup.string().required(ErrorMessages.reqiuredField),
    groupId: yup.string().required(ErrorMessages.reqiuredField),
  })
  .required();

export const schemaEditSort = yup
  .object()
  .shape({
    name: yup.string().required(ErrorMessages.reqiuredField),
    groupId: yup.string().required(ErrorMessages.reqiuredField),
    categoryId: yup.string().required(ErrorMessages.reqiuredField),
  })
  .required();

export const schemaAddPlantationContact = yup
  .object()
  .shape({
    id: yup.string().required(ErrorMessages.reqiuredField),
    name: yup.string().required(ErrorMessages.reqiuredField),
    email: yup
      .string()
      .email(ErrorMessages.invalidEmail)
      .required(ErrorMessages.reqiuredField),
    whatsapp: yup.string().required(ErrorMessages.reqiuredField),
    telegram: yup.string().required(ErrorMessages.reqiuredField),
    skype: yup.string().required(ErrorMessages.reqiuredField),
    position: yup.string().required(ErrorMessages.reqiuredField),
    department: yup.string().required(ErrorMessages.reqiuredField),
  })
  .required();

export const schemaAddTransferDetails = yup
  .object<EditTransferDetailsInput>()
  .shape({
    id: yup.string().required(ErrorMessages.reqiuredField),
    name: yup.string().required(ErrorMessages.reqiuredField),
    beneficiary: yup.string().required(ErrorMessages.reqiuredField),
    beneficiaryAddress: yup.string().default(""),
    documentPath: yup.string().default(""),
    favourite: yup.boolean().default(false),
    bank: yup.string().required(ErrorMessages.reqiuredField),
    bankAddress: yup.string().default(""),
    bankAccountNumber: yup.string().required(ErrorMessages.reqiuredField),
    bankAccountType: yup.string().required(ErrorMessages.reqiuredField),
    bankSwift: yup.string().default(""),
    correspondentBank: yup.string().default(""),
    correspondentBankAddress: yup.string().default(""),
    correspondentBankAccountNumber: yup.string().default(""),
    correspondentBankSwift: yup.string().default(""),
  })
  .required();

export const schemaAddCheck = yup
  .object()
  .shape({
    id: yup.string().required(ErrorMessages.reqiuredField),
    name: yup.string().required(ErrorMessages.reqiuredField),
    beneficiary: yup.string().required(ErrorMessages.reqiuredField),
    favourite: yup.boolean().default(false),
    documentPath: yup.mixed().optional(),
  })
  .required();

export const schemaAddPlantationLegalEntity = yup
  .object()
  .shape({
    id: yup.string().required(ErrorMessages.reqiuredField),
    name: yup.string().required(ErrorMessages.reqiuredField),
    code: yup.string().required(ErrorMessages.reqiuredField),
    legalAddress: yup.string().required(ErrorMessages.reqiuredField),
    actualAddress: yup.string().required(ErrorMessages.reqiuredField),
  })
  .required();

export const schemaEditPlantation = yup
  .object<EditPlantationInput>()
  .shape({
    generalInfo: yup
      .object<EditPlantationInput>()
      .shape({
        id: yup.string().required(ErrorMessages.reqiuredField),
        name: yup.string().required(ErrorMessages.reqiuredField),
        country: yup.string().required(ErrorMessages.reqiuredField),
        comments: yup.string().default(""),
        deliveryMethod: yup.string().required(ErrorMessages.reqiuredField),
        termsOfPayment: yup.string().required(ErrorMessages.reqiuredField),
        postpaidCredit: yup.string().default(""),
        postpaidDays: yup.string().default(""),
      })
      .required(),
    legalEntities: yup.array().of(schemaAddPlantationLegalEntity).required(),
    transferDetails: yup.array().of(schemaAddTransferDetails).required(),
    checks: yup.array().of(schemaAddCheck).required(),
    financialContacts: yup.array().of(schemaAddPlantationContact).required(),
    salesContacts: yup.array().of(schemaAddPlantationContact).required(),
  })
  .required();
