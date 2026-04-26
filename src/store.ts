import { Product, UserProfile } from "./types";

const PRODUCTS_KEY = "dzayer_products";
const PROFILE_KEY = "dzayer_profile";

export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const addProduct = (product: Product) => {
  const products = getProducts();
  saveProducts([...products, product]);
};

export const updateProduct = (updatedProduct: Product) => {
  const products = getProducts();
  saveProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
};

export const getProfile = (): UserProfile | null => {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveProfile = (profile: UserProfile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

// Initial setup with mock data if empty
export const initMockData = () => {
  if (!getProfile()) {
    saveProfile({
      id: "user-1",
      firstName: "Ahmed",
      lastName: "Algiers",
      companyName: "Dzayer Shop",
      email: "contact@dzayer.com",
      phone: "0555001122",
      location: "Alger Centre",
      address: "123 Rue Didouche Mourad",
      deliverWilaya: "16",
      deliverFees: 500,
      refundPolicy: "Refund within 7 days if product is damaged.",
      replacePolicy: "Replace within 15 days.",
      returnPolicy: "Return in original packaging.",
    });
  }
};
