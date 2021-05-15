import { format } from 'date-fns';
import Order, { OrderLine } from './Order';
import { loadFromStorage } from './userContext';

const Utilities = {
  Constants: {
    FIELDSEPARATOR: '$',
    IDENTIFIER: '_identifier'
  },
  UTIL: {
    encodeXMLComponent: (label: string) => {
      return label // TODO encode as per OB function in webpos
    },
    isNullOrUndefined: (object: any) => {
      return typeof object === 'undefined' || object == null
    },
    getChangeLabelFromReceipt: (order: Order) => {
      const change = order.get('change')
      const changePayments = order.get('changePayments')

      if (change) {
        return change.toString() + order.get('currency$_identifier')
      } else if (changePayments) {
        return changePayments.map((payment: any) => payment.label).join(' + ')
      } else {
        return null
      }
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
    formatCurrency: (amount?: number) => {
      return amount?.toString()
    },
    formatDate: (date?: Date | string) => {
      const defaultDateFormat = 'dd-MM-yyyy'
      if (!date || typeof date === 'string') {
        return date
      }
      return format(date, defaultDateFormat)
    },
    formatHour: (dateString?: Date | string, includeSeconds: boolean = false) => {
      let date = new Date()
      if (typeof dateString === 'string') {
        date = new Date(dateString)
      }
      return format(date, `HH:mm${includeSeconds ? ':ss' : ''}`)
    },
    formatRate: (rate?: number) => {
      return `${rate}%`
    }
  },
  DEC: {
    sub: (a: number, b: number) => {
      return a - b
    }
  },
  MobileApp: {
    model: {
      get: (property: string) => {
        switch (property) {
          case 'terminal':
            return {
              organizationTaxId: '*TAXID*',
              organizationAddressIdentifier: '*Organization Address*'
              // TODO rest of the properties
            }

          default:
            return {}
        }
      },
      hasPermission: (preference: string, checkForAdmin: boolean) => {
        // TODO: allow the user to set preference values somehow
        return true
      }
    }
  },
  App: {
    PrintUtils: {
      printQty: (quantity: number) => {
        return quantity.toString()
      },
      printAmount: (amount?: number) => {
        return amount?.toString()
      },
      printTicketLinePrice: (line: OrderLine) => {
        return line.printPrice()
      },
      printTicketLineAmount: (line: OrderLine) => {
        return line.printTotalLine()
      },
      getChangeLabelFromTicket: (ticket: any) => {
        return Utilities.UTIL.getChangeLabelFromReceipt(ticket)
      }
    },
    TerminalProperty: {
      get: (property: string) => {
        switch (property) {
          case 'terminal':
            return {
              organizationTaxId: '*Organization Tax ID*',
              organizationAddressIdentifier: '*Organization Address*'
              // TODO rest of the properties
            }

          default:
            return {}
        }
      }
    },
  }
}

export default Utilities