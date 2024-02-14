import { ErrorMessages } from "./constants";
import * as yup from "yup";

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
    groupId: yup
      .number()
      .typeError(ErrorMessages.reqiuredField)
      .required(ErrorMessages.reqiuredField),
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
