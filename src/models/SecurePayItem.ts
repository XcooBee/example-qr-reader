/**
 * URL data parameters.
 */
enum DataParams {
  amount = '0-3',
  tax = '0-5',
  reference = '0-6',
  logic = 'l',
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
  logic: SecurePayItemLogic;

  constructor(campaignRef: string, formRef: string, amount: number, tax: number, reference: string, logic: SecurePayItemLogic) {
    this.campaignRef = campaignRef;
    this.formRef = formRef;
    this.amount = amount;
    this.tax = tax;
    this.reference = reference;
    this.logic = logic;
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
      data[DataParams.logic],
    );
  }

  toString(): String {
    return `SecurePayItem { amount: ${this.amount}, tax: ${this.tax}, ref: ${this.reference}, logic: ${this.logic}`;
  }
}

export type SecurePayLogicSubSet = {
  [0]: string;
  [1]: number;
};

export type SecurePayExternalPricing = string | {
  description: {
    [key: string]: string;
  };
  image_ref: string;
  price: number;
  tax: number;
};

type addMinOrFixed = {
  a: 1; // addMinOrFixed
  m: number;
  o: number;
  r: string;
}

type addMaxOrFixed = {
  a: 2; // addMaxOrFixed
  M: number;
  o: number;
  r: string;
}

type addSubRadio = {
  a: 3; //
  r: string[];
}

type addSubRadioWithExtraCost = {
  a: 4; // addSubRadioWithExtraCost
  r: [SecurePayLogicSubSet];
}

type addSubCheckbox = {
  a: 5; // addSubCheckbox
  r: string[];
}

type addSubCheckboxWithExtraCost = {
  a: 6; // addSubCheckboxWithExtraCost
  r: [SecurePayLogicSubSet];
}

type setTip = {
  a: 7; // setTip
}

type externalPricing = {
  a: 8; // externalPricing
  r: SecurePayExternalPricing;
}

type userEntry = {
  a: 9; // userEntry
}

type setTotal = {
  a: 10; // setTotal
}

export type SecurePayItemLogic = addMinOrFixed
  | addMaxOrFixed
  | addSubRadio
  | addSubRadioWithExtraCost
  | addSubCheckbox
  | addSubCheckboxWithExtraCost
  | setTip
  | externalPricing
  | userEntry
  | setTotal;
