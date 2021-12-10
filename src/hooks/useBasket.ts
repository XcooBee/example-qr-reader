import { SecurePayItem } from '../models';
import { BasketContext, BasketContextProps } from '../context';
import { useCallback, useContext } from 'react';

export type Basket = Pick<BasketContextProps, 'campaignRef' | 'formRef' | 'items'> & {
  addItem: (value: SecurePayItem) => void,
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

  return {
    campaignRef,
    formRef,
    items: items,
    addItem,
  };
};
