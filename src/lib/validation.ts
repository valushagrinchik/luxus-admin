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
