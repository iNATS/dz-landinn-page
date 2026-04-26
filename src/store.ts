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

// Initial setup - only if essential
export const initAppData = () => {
  if (!getProfile()) {
    // Keep a basic empty profile or handle it in register
  }
};
