/**
 * URL data parameters.
 */
enum DataParams {
  amount = '0-3',
  tax = '0-5',
  reference = '0-6',
}

/**
 * Represents a secure pay item.
 */
export class SecurePayItem {
  campaignRef: string;
  formRef: string;
  amount: number;
  tax: number;
  reference: string;

  constructor(campaignRef: string, formRef: string, amount: number, tax: number, reference: string) {
    this.campaignRef = campaignRef;
    this.formRef = formRef;
    this.amount = amount;
    this.tax = tax;
    this.reference = reference;
  }

  /**
   * Creates a new instance based on specified parameters.
   *
   * @param campaignRef - Campaign reference.
   * @param formRef - Form reference.
   * @param data - Decoded data.
   */
  static fromData(campaignRef: string, formRef: string, data: any): SecurePayItem {
    return new SecurePayItem(
      campaignRef,
      formRef,
      data[DataParams.amount],
      data[DataParams.tax],
      data[DataParams.reference],
    );
  }

  toString(): String {
    return `SecurePayItem { amount: ${this.amount}, tax: ${this.tax}, ref: ${this.reference}}`;
  }
}
