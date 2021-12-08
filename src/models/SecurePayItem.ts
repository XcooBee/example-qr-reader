export class SecurePayItem {
  amount: number;
  tax: number;
  reference: string;

  constructor(amount: number, tax: number, reference: string) {
    this.amount = amount;
    this.tax = tax;
    this.reference = reference;
  }

  toString(): String {
    return `SecurePayItem { amount: ${this.amount}, tax: ${this.tax}, ref: ${this.reference}}`;
  }
}
