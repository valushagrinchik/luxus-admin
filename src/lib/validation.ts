import {
  EditPlantationInput,
  EditTransferDetailsInput,
} from "../components/forms/EditPlantationForm/interfaces";
import { ErrorMessages } from "./constants";
import * as yup from "yup";
import { ChecksDeliveryMethod, CountryCode, TermsOfPayment } from "./types";

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
    email: yup.string().required(ErrorMessages.reqiuredField),
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
    beneficiaryAddress: yup.string(),
    favourite: yup.boolean().default(false),
    bank: yup.string().required(ErrorMessages.reqiuredField),
    bankAddress: yup.string(),
    bankAccountNumber: yup.string().required(ErrorMessages.reqiuredField),
    bankAccountType: yup.string().required(ErrorMessages.reqiuredField),
    bankSwift: yup.string(),
    correspondentBank: yup.string(),
    correspondentBankAddress: yup.string(),
    correspondentBankAccountNumber: yup.string(),
    correspondentBankSwift: yup.string(),
    plantationLegalEntityId: yup.string().required(ErrorMessages.reqiuredField),
  })
  .required();

export const schemaAddCheck = yup
  .object()
  .shape({
    id: yup.string().required(ErrorMessages.reqiuredField),
    name: yup.string().required(ErrorMessages.reqiuredField),
    favourite: yup.boolean().default(false),
    beneficiary: yup.string().required(ErrorMessages.reqiuredField),
    plantationLegalEntityId: yup.string().required(ErrorMessages.reqiuredField),
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
    generalInfo: yup.object<EditPlantationInput>().shape({
      id: yup.string().required(ErrorMessages.reqiuredField),
      name: yup.string().required(ErrorMessages.reqiuredField),
      country: yup.string().required(ErrorMessages.reqiuredField),
      comments: yup.string().default(""),
      deliveryMethod: yup.string().when("country", ([country], field) => {
        return country && country !== CountryCode.co
          ? field
              .oneOf(Object.values(ChecksDeliveryMethod))
              .required(ErrorMessages.reqiuredField)
          : field;
      }),
      deliveryInfo: yup
        .string()
        .when("deliveryMethod", ([deliveryMethod], field) => {
          return deliveryMethod &&
            deliveryMethod === ChecksDeliveryMethod.SERVIENTREGA
            ? field.required(ErrorMessages.reqiuredField)
            : field.notRequired();
        }),
      termsOfPayment: yup
        .string()
        .oneOf(Object.values(TermsOfPayment))
        .required(ErrorMessages.reqiuredField),
      postpaidCredit: yup
        .string()
        .when("termsOfPayment", ([termsOfPayment], field) => {
          return termsOfPayment === TermsOfPayment.POSTPAID
            ? field.required(ErrorMessages.reqiuredField)
            : field;
        }),
      postpaidDays: yup
        .string()
        .when("termsOfPayment", ([termsOfPayment], field) => {
          return termsOfPayment === TermsOfPayment.POSTPAID
            ? field.required(ErrorMessages.reqiuredField)
            : field;
        }),
    }),
    legalEntities: yup
      .array()
      .of(schemaAddPlantationLegalEntity)
      .min(1, "at least 1")
      .required(),
    transferDetails: yup
      .array()
      .of(schemaAddTransferDetails)
      .min(1, "at least 1")
      .required(),
    checks: yup
      .array()
      .when(
        ["legalEntities", "generalInfo"],
        ([legalEntities, generalInfo], field) => {
          if (generalInfo.country !== CountryCode.co) {
            return field
              .of(schemaAddCheck)
              .min(legalEntities.length, "legalEntities length");
          }
          return field;
        }
      )
      .required(),
    financialContacts: yup
      .array()
      .of(schemaAddPlantationContact)
      .min(1, "at least 1")
      .required(),
    salesContacts: yup
      .array()
      .of(schemaAddPlantationContact)
      .min(1, "at least 1")
      .required(),
  })
  .required();
