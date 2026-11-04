export interface StoreInfo {
  name: string;
  branch: string;
  tel: string;
  address: string;
  website: string;
  taxRate: number;
}

export const CENTRAL_STORE_INFO: StoreInfo = {
  name: "JustGoDev CLOUD STORE",
  branch: "Vientiane Flagship",
  tel: "+856 20 77 426 238",
  address: "Phonphanao, Xaysettha, Vientiane Capital",
  website: "JustGoDev.com",
  taxRate: 0.07, // 7% VAT
};

