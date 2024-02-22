import { pick } from "lodash";
import { CreatePlantationBody } from "../api/interfaces";
import { EditPlantationInput } from "../components/forms/EditPlantationForm/interfaces";
import { PlantationDepartment, SortListGroup } from "./constants";
import { Plantation } from "./types";

export const transformPlantationData = (
  formData: EditPlantationInput
): CreatePlantationBody => {
  return {
    ...formData.generalInfo,
    legalEntities: formData.legalEntities.map((entity) => ({
      ...entity,
      checks: formData.checks.filter((check) => check.name === entity.name),
      transferDetails: formData.transferDetails.filter(
        (check) => check.name === entity.name
      ),
    })),
    contacts: [...formData.financialContacts, ...formData.salesContacts],
  };
};

export const transformPlantationDataBack = (
  data: Plantation
): EditPlantationInput => {
  return {
    generalInfo: {
      ...pick(data, [
        "name",
        "country",
        "comments",
        "deliveryMethod",
        "termsOfPayment",
        "postpaidCredit",
        "postpaidDays",
      ]),
      postpaidCredit: (data.postpaidCredit || "").toString(),
      postpaidDays: (data.postpaidDays || "").toString(),
      id: data.id.toString(),
    },
    legalEntities: data.legalEntities.map((entity) => ({
      ...entity,
      id: entity.id.toString(),
      plantationId: entity.plantationId.toString(),
    })),
    checks: (data.checks || []).map((entity) => ({
      ...entity,
      id: entity.id.toString(),
      plantationId: entity.plantationId.toString(),
      plantationLegalEntityId: entity.plantationLegalEntityId.toString(),
    })),
    transferDetails: (data.transferDetails || []).map((entity) => ({
      ...entity,
      id: entity.id.toString(),
      plantationId: entity.plantationId.toString(),
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
