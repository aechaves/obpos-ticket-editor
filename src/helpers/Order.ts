import OB from './OB'

export default class Order {
  [property: string]: any
  lines?: Collection<OrderLine>

  constructor(object: any) {
    const order = object
    for (const key in order) {
      this[key] = order[key]

      if (this[key] && Array.isArray(this[key])) {
        this[key] = new Collection<BaseObject>(this[key], BaseObject)
      }

      if (key === 'bp') {
        this[key] = new BusinessPartner(order[key])
      }
      if (key === 'lines') {
        this[key] = new Collection<OrderLine>(order[key], OrderLine)
      }
    }
  }

  get(property: string) {
    return this[property]
  }

  getQty() {
    return this.get('qty')
  }

  getGross() {
    const gross = this.get('gross')
    if (!gross && this.get('priceIncludesTax')) {
      return this.getQty() * this.get('price')
    }
    return gross
  }

  printGross() {
    OB.I18N.formatCurrency(this.getGross())
  }

  getScannableDocumentNo() {
    // TODO remove invalid characters to use the document number in a barcode
    return this['documentNo']
  }
}

class BaseObject {
  [key: string]: any

  constructor(obj: any) {
    for (const key in obj) {
      this[key] = obj[key]
    }
  }

  get(property: string) {
    return this[property]
  }

  has(property: string) {
    this.hasOwnProperty(property)
  }
}

class Collection<T extends BaseObject> extends Array {
  models?: any

  // Workaround:
  // The second parameter is needed because we cant do new T(item) referencing the generic T
  // So we ask the type again in the constructor 
  constructor(array: Array<any>, private T?: new (obj: any) => T) {
    super()
    if (!T) { return }

    for (const item of array) {
      this.push(new T(item))
    }

    this.models = this
  }

  at(index: number) {
    return this[index]
  }
}

class BusinessPartner extends BaseObject {

}

export class OrderLine extends BaseObject {
  constructor(obj: any) {
    super(obj)
    this.product = new Product(this.product)
  }

  getDiscountAmount() {
    let discount = 0
    const promotions = this.get('promotions')
    if (promotions && promotions.length > 0) {
      discount = promotions.reduce((discount: any, promotion: any) => {
        if (promotion.amt) {
          return discount;
        }
        return discount + promotion.amt;
      }, 0);
    }

    return discount
  }

  getPrice() {
    let price = this.get('price')
    if (!price) {
      if (this.get('priceIncludesTax')) {
        price = this.get('grossUnitPrice')
      } else {
        price = this.get('netUnitPrice')
      }
      price = price || this.get('product').get('standardPrice')
    }

    return price || 0
  }

  printQty() {
    return this.get('qty').toString()
  }

  printPrice() {
    return OB.I18N.formatCurrency(this.getPrice());
  }

  printGross() {
    return OB.I18N.formatCurrency(this.get('_gross') || this.get('gross'));
  }

  printNet() {
    return OB.I18N.formatCurrency(this.get('net'));
  }

  printDiscount() {
    return OB.I18N.formatCurrency(this.getDiscountAmount());
  }

  printTotalLine() {
    return OB.I18N.formatCurrency((this.getPrice() * this.get('qty')) - this.getDiscountAmount());
  }
}

class Product extends BaseObject {

}