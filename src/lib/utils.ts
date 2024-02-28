import { pick } from "lodash";
import { CreatePlantationBody } from "../api/interfaces";
import { EditPlantationInput } from "../components/forms/EditPlantationForm/interfaces";
import { PlantationDepartment, SortListGroup } from "./constants";
import { ChecksDeliveryMethod, CountryCode, Plantation } from "./types";

export const transformPlantationData = (
  input: EditPlantationInput
): CreatePlantationBody => {
  return {
    ...input.generalInfo,
    legalEntities: input.legalEntities.map((entity) => ({
      ...entity,
      checks: input.checks.filter((check) => check.name === entity.name),
      transferDetails: input.transferDetails.filter(
        (check) => check.name === entity.name
      ),
    })),
    contacts: [...input.financialContacts, ...input.salesContacts],
  };
};

export const transformPlantationDataBack = (
  data: Plantation
): EditPlantationInput => {
  return {
    generalInfo: {
      ...pick(data, [
        "name",
        "comments",
        // "deliveryMethod",
        "deliveryInfo",
        "termsOfPayment",
        "postpaidCredit",
        "postpaidDays",
      ]),
      deliveryMethod: data?.deliveryMethod
        ? (data?.deliveryMethod as ChecksDeliveryMethod)
        : undefined,
      country: data.country as CountryCode,
      postpaidCredit: (data.postpaidCredit || "").toString(),
      postpaidDays: (data.postpaidDays || "").toString(),
      id: data.id.toString(),
    },
    legalEntities: data.legalEntities.map((entity) => ({
      ...entity,
      id: entity.id.toString(),
    })),
    checks: (data.checks || []).map((entity) => ({
      ...entity,
      id: entity.id.toString(),
      plantationLegalEntityId: entity.plantationLegalEntityId.toString(),
    })),
    transferDetails: (data.transferDetails || []).map((entity) => ({
      ...entity,
      id: entity.id.toString(),
      plantationLegalEntityId: entity.plantationLegalEntityId.toString(),
    })),
    financialContacts: (data.contacts || [])
      .filter(
        (contact) => contact.department === PlantationDepartment.FINANCIAL
      )
      .map((contact) => ({
        ...contact,
        id: contact.id.toString(),
      })),
    salesContacts: (data.contacts || [])
      .filter((contact) => contact.department === PlantationDepartment.SALES)
      .map((contact) => ({
        ...contact,
        id: contact.id.toString(),
      })),
  };
};

export const defineRowConfig = (group: SortListGroup | null) => {
  switch (group) {
    case SortListGroup.group: {
      return {
        group: false,
        category: false,
        sort: false,
      };
    }
    case SortListGroup.category: {
      return {
        group: true,
        category: false,
        sort: false,
      };
    }
    case SortListGroup.sort: {
      return {
        group: true,
        category: true,
        sort: false,
      };
    }
  }
  return {
    group: true,
    category: true,
    sort: false,
  };
};

export const today = () => {
  return new Date().toLocaleDateString("en-US");
};
