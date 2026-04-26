/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  mainColor: string;
  photos: string[];
  termsAndConditions: string;
  isActive: boolean;
  createdAt: string;
  
  // Landing page config
  slug: string;
  customDomain?: string;
  
  // Pixels
  googleAnalyticsId?: string;
  metaPixelId?: string;
  tiktokPixelId?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  deliverWilaya: string;
  deliverFees: number;
  refundPolicy: string;
  replacePolicy: string;
  returnPolicy: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export type Wilaya = {
  code: string;
  name: string;
  nameAr: string;
};
