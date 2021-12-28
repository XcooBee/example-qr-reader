import { useCallback, useContext } from 'react';
import _ from 'lodash';
import { SecurePayItem } from '../models';
import { BasketContext, BasketContextProps } from '../context';

export type Basket = Pick<BasketContextProps, 'campaignRef' | 'formRef' | 'items'> & {
  addItem: (value: SecurePayItem) => void,
  removeItem: (index: number) => void,
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

  const removeItem = useCallback((index: number) => {
    let newItems = _.remove(items, (e, i) => (i != index));
    console.log(index, newItems);

    setItems(newItems);
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
    removeItem,
    toTotal,
    toTax,
  };
};
