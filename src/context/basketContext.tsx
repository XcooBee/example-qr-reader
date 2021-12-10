import React, { createContext, useState } from 'react';
import { SecurePayItem } from '../models';

export type BasketContextProps = {
  campaignRef?: string;
  formRef?: string;
  items: SecurePayItem[];
  setCampaignRef: (value?: string) => void;
  setFormRef: (value?: string) => void;
  setItems: (value: SecurePayItem[]) => void;
};

export const BasketContext = createContext<BasketContextProps>({} as BasketContextProps);

export const BasketProvider: React.FC = ({ children }) => {
  const [campaignRef, setCampaignRef] = useState<string>();
  const [formRef, setFormRef] = useState<string>();
  const [items, setItems] = useState<SecurePayItem[]>([]);

  return (
    <BasketContext.Provider
      value={{
        campaignRef,
        formRef,
        items,
        setCampaignRef,
        setFormRef,
        setItems,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
