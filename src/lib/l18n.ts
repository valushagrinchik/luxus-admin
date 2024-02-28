const L18nEs = {
  constants: {
    countries: {
      ec: "Ecuador",
      co: "Colombia",
    },
    deliveryMethods: {
      PERSONALLY: "Personalmente",
      SERVIENTREGA: "Servientrega",
    },
    bankAccountTypes: {
      CURRENT: "Cuenta corriente",
      SAVINGS: "Cuenta de ahorros",
    },
    financialPositions: {
      SOCIO: "SOCIO",
      GERENTE: "GERENTE",
      "ASISTENTE CONTABLE": "ASISTENTE CONTABLE",
      "ASISTENTE ADMINISTRATIVO": "ASISTENTE ADMINISTRATIVO",
    },
    salesPositions: {
      "GERENTE COMERCIAL": "GERENTE COMERCIAL",
      EJECUTIVO: "EJECUTIVO",
    },
    termsOfPayments: {
      PREPAID: "Prepago",
      PAIDUPONACTUAL: "Pago al contado",
      POSTPAID: "Pago diferido",
    },
  },
  buttons: {
    upload: {
      label: "Subir",
    },
  },
  shared: {
    contactsBlock: {
      title: "Contactos",
      table: {
        headers: {
          name: "Nombre",
          email: "Email",
          whatsapp: "Whatsapp",
          telegram: "Telegram",
          skype: "Skype",
          position: "Cargo",
        },
      },
      addForm: {
        title: "Crear",
        fields: {
          name: {
            label: "Nombre",
            placeholder: "Indicar Nombre",
            requirerd: true,
          },
          email: {
            label: "Email",
            placeholder: "Indicar Email",
            requirerd: true,
          },
          whatsapp: {
            label: "Whatsapp",
            placeholder: "Indicar Whatsapp",
            requirerd: true,
          },
          telegram: {
            label: "Telegram",
            placeholder: "Indicar Telegram",
            requirerd: true,
          },
          skype: {
            label: "Skype",
            placeholder: "Indicar Skype",
            requirerd: true,
          },
          position: {
            label: "Cargo",
            placeholder: "Seleccionar Cargo",
            requirerd: true,
          },
        },
      },
    },
  },
  pages: {
    plantation: {
      filters: {
        fields: {
          termsOfPayment: {
            label: "Condiciones de pago",
            placeholder: "Seleccione",
          },
          country: {
            label: "País",
            placeholder: "Seleccione",
          },
        },
      },
      list: {
        table: {
          headers: {
            id: "№",
            country: "País",
            name: "Nombre comercial",
            legalEntitiesNames: "Razón social",
            termsOfPayment: "Condiciones de pago",
            postpaidCredit: "Monto de crédito",
            comments: "Observaciones",
          },
        },
      },
      create: {
        title: "Registrar finca",
        tabs: {
          general: {
            title: "Datos generales",
            mainForm: {
              fields: {
                id: {
                  label: "Número",
                },
                country: {
                  label: "País",
                },
                name: {
                  label: "Nombre comercial",
                  placeholder: "Indicar nombre comercial",
                },
              },
            },

            legalEntityBlock: {
              title: "Datos generales",
              table: {
                headers: {
                  name: "Razón Social",
                  code: "Ruc o cédula",
                  legalAddress: "Domicilio tributario",
                  actualAddress: "Domicilio real",
                },
              },
              addForm: {
                title: "Crear",
                fields: {
                  name: {
                    label: "Razón Social",
                    placeholder: "Indicar Razón Social",
                    required: true,
                  },
                  code: {
                    label: {
                      ec: "Ruc o cédula",
                      co: "",
                    },
                    placeholder: {
                      ec: "Indicar Ruc o cédula",
                      co: "",
                    },
                    required: true,
                  },
                  legalAddress: {
                    lebal: "Domicilio tributario",
                    placeholder: "Indicar Domicilio tributario",
                    required: true,
                  },
                  actualAddress: {
                    lebal: "Domicilio real",
                    placeholder: "Indicar Domicilio real",
                    required: true,
                  },
                },
              },
            },

            commentsForm: {
              fields: {
                comments: {
                  label: "Observaciones",
                  placeholder: "Introduce un comentario",
                },
              },
            },
          },
          financial: {
            title: "Datos financieros",

            transferDetailsBlock: {
              title: "Transferencia",
              table: {
                headers: {
                  // favourite: "",
                  name: "Razón social",
                  beneficiary: "Beneficiario",
                  beneficiaryAddress: "Dirección del beneficiario",
                  bank: "Nombre del banco",
                  bankAddress: "Dirección del banco",
                  bankAccountNumber: "№ Cuenta bancaria",
                  bankAccountType: "Tipo Cuenta Bancaria",
                  bankSwift: "Swift",
                },
              },

              addForm: {
                title: "",
                fields: {
                  name: {
                    label: "Razón social",
                    placeholder: "Torres cuzco greys abigail",
                    required: true,
                  },
                  beneficiary: {
                    label: "Beneficiario",
                    placeholder: "Torres cuzco greys abigail",
                    required: true,
                  },
                  documentPath: {
                    placeholder: "La letra de cambio a un tercero",
                    required: false,
                  },
                  beneficiaryAddress: {
                    label: "Dirección del beneficiario",
                    placeholder: "",
                    required: false,
                  },
                  bank: {
                    label: "Nombre del banco",
                    placeholder: "Indicar Nombre del banco",
                    required: true,
                  },
                  bankAddress: {
                    label: "Dirección del banco",
                    placeholder: "Indicar Dirección del banco",
                    required: false,
                  },
                  bankAccountNumber: {
                    label: "№ Cuenta bancaria",
                    placeholder: "Indicar № Cuenta bancaria",
                    required: true,
                  },
                  bankAccountType: {
                    label: "Tipo Cuenta Bancaria",
                    placeholder: "Seleccionar Tipo Cuenta Bancaria",
                    required: true,
                  },
                  bankSwift: {
                    label: "Swift",
                    placeholder: "Indicar SWIFT",
                    required: false,
                  },
                  correspondentBank: {
                    label: "Nombre del banco corresponsal",
                    placeholder: "Indicar Nombre del banco corresponsal",
                  },
                  correspondentBankAddress: {
                    label: "Dirección del banco corresponsal",
                    placeholder: "Indicar Dirección del banco corresponsal",
                  },
                  correspondentBankAccountNumber: {
                    label: "№ Cuenta bancaria del banco corresponsal",
                    placeholder: "Indicar № Cuenta bancaria del banco corr ...",
                  },
                  correspondentBankSwift: {
                    label: "Swift",
                    placeholder: "Indicar SWIFT",
                  },
                },
              },
            },
            checksBlock: {
              title: "Cheques",
              table: {
                headers: {
                  // favourite: "",
                  name: "Razón social",
                  beneficiary: "Páguese a la orden de",
                },
              },
              addForm: {
                title: "Crear",
                fields: {
                  name: {
                    label: "Razón Social",
                    placeholder: "Indicar Razón social",
                    required: true,
                  },
                  beneficiary: {
                    label: "Páguese a la orden de",
                    placeholder: "Indicar Páguese a la orden de",
                    required: true,
                  },
                  documentPath: {
                    placeholder: "La letra de cambio a un tercero",
                    required: false,
                  },
                },
              },
              deliveryMethodForm: {
                title: "Forma de entrega del cheque",
                fields: {
                  deliveryMethod: {},
                },
              },
            },
            termsOfPaymentForm: {
              title: "Condiciones de pago",
              fields: {
                termsOfPayment: {
                  label: "Plazo de pagos",
                  placeholder: "Pago diferido",
                  required: true,
                },
                postpaidDays: {
                  label: "Cantidad de dias",
                  placeholder: "Indicar cantidad de dias",
                  required: false,
                },
                postpaidCredit: {
                  label: "Monto de crédito",
                  placeholder: "Indicar monto de crédito",
                  required: false,
                },
              },
            },
          },
          sales: {
            title: "Departamento de ventas",
          },
        },
        modals: {
          approveReset: "¿Deseas salir sin guardar los cambios?",
        },
      },
      update: {},
    },
  },
};

export default L18nEs;
