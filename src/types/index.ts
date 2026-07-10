export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  discount?: number;
  images: string[];
  category: Category;
  brand: Brand;
  colors: ProductColor[];
  sizes: ProductSize[];
  tags: string[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  material?: string;
  careInstructions?: string;
  createdAt: Date;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  name: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  parentId?: string;
  children?: Category[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  products: Product[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: Date;
  images?: string[];
  verified: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "credit-card" | "cod" | "bank-transfer";

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: Product[];
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: "order" | "promo" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  readTime: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  product?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minPurchase: number;
  maxDiscount?: number;
  expiresAt: Date;
  usageLimit: number;
  usedCount: number;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
  revenueData: { month: string; revenue: number; profit: number }[];
  ordersData: { month: string; orders: number }[];
  categoryData: { name: string; value: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
}
