import { loadFromStorage, UserConfiguration } from './userContext';

const OB = {
  UTIL: {
    encodeXMLComponent: (label: string) => {
      return label // TODO encode as per OB function in webpos
    }
  },
  I18N: {
    getLabel: (key: string, params?: any[]) => {
      const { messageLabels } = loadFromStorage()
      let label = messageLabels[key]

      if (!label) {
        return key;
      }

      if (params) {
        for (const param of params) {
          label = label?.replace('%', param)
        }
      }

      return label;
    },
    formatDate: (date?: Date | string) => {
      if (typeof date === 'string') {
        return date
      }
      return date?.toISOString() //TODO formatting?
    },
    formatHour: (date?: Date | string) => {
      if (typeof date === 'string') {
        return date
      }
      return date?.toISOString() //TODO formatting
    },
    formatRate: (rate?: number) => {
      return rate?.toString() // TODO formatting
    }
  },
  App: {
    PrintUtils: {
      printQty: (quantity: number) => {
        return quantity.toString() // TODO formatting
      },
      printAmount: (amount: number) => {
        return amount.toString() // TODO formatting
      },
      printTicketLinePrice: (price: number) => {
        return price.toString() // TODO formatting
      },
      printTicketLineAmount: (amount: number) => {
        return amount.toString() // TODO formatting
      },
      getChangeLabelFromTicket: (ticket: any) => {
        return 'Change label is not supported yet' // TODO figure this out
      }
    },
    TerminalProperty: {
      get: (property: string) => {
        switch (property) {
          case 'terminal':
            return {
              organizationTaxId: 'EXAMPLE123',
              organizationAddressIdentifier: 'ExampleOrgAddress'
              // TODO rest of the properties
            }

          default:
            return {}
        }
      }
    },
  }
}

export default OB