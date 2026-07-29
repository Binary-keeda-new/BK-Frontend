export interface Product {
  _id: string;

  productName: string;
  productRating: number;

  brand: string;
  category: string;
  goals: string[];

  productImage: string;

  currentPrice: number;
  originalPrice: number;

  affiliateLink: string;

  status: "draft" | "published";

  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  productName: string;
  productRating: number;

  brand: string;
  category: string;
  goals: string[];

  productImage: string;

  currentPrice: number;
  originalPrice: number;

  affiliateLink: string;

  status: "draft" | "published" | "archived";
}