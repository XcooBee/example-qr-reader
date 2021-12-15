import { SecurePayItem } from '../models';
import { BasketContext, BasketContextProps } from '../context';
import { useCallback, useContext } from 'react';

export type Basket = Pick<BasketContextProps, 'campaignRef' | 'formRef' | 'items'> & {
  addItem: (value: SecurePayItem) => void,
  toTotal: () => string,
  toTax: () => string,
}

export const useBasket = (): Basket => {
  const {
    campaignRef,
    formRef,
    items,
    setCampaignRef,
    setFormRef,
    setItems,
  } = useContext(BasketContext);

  const addItem = useCallback((securePayItem: SecurePayItem) => {
    if (!items.includes(securePayItem)) {
      // In case, it's first item then set campaign and form
      if (items.length === 0) {
        setCampaignRef(securePayItem.campaignRef);
        setFormRef(securePayItem.formRef);
      }

      setItems(items.concat([securePayItem]));
    }
  }, [items]);

  const getTotal = useCallback(() => {
    return items.reduce((prev, curr) => prev + curr.amount, 0.0);
  }, [items]);

  const toTotal = useCallback(() => {
    return getTotal().toFixed(2);
  }, [getTotal]);

  const getTax = useCallback(() => {
    return items.reduce((prev, curr) => prev + curr.tax, 0.0);
  }, [items]);

  const toTax = useCallback(() => {
    return getTax().toFixed(2);
  }, [getTax]);

  return {
    campaignRef,
    formRef,
    items: items,
    addItem,
    toTotal,
    toTax,
  };
};
