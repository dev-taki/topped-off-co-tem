// Auth Types
export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  authToken: string;
  role?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  name?: string;
  email?: string;
}

export interface UserProfile {
  id: number;
  created_at: number;
  name: string;
  email: string;
  square_customer_id: string;
  role: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
}

// Subscription Types
export interface PlanVariation {
  id: number;
  created_at: number;
  object_id: string;
  plan_id: string;
  name: string;
  version: number;
  status: string;
  cadence: string;
  amount: number;
  type: string;
  business_id: string;
  credit: number;
  credit_charge_amount: number;
  description: string;
  tax_percentage: number;
  gift_credit: number;
  gift_credit_charge_amount: number;
  image_link: string;
  daily_redemption_active: boolean;
  redemption_quantity: number;
}

export interface UserSubscription {
  id: number;
  created_at: number;
  status: string;
  object_id: string;
  card_id: string;
  location_id: string;
  plan_variation_id: string;
  start_date: number;
  end_date: number;
  cancellation_data: any;
  version: number;
  email: string;
  business_id: string;
  user_id: string;
  customer_id: string;
  cadence: string;
  available_credit: number;
  gift_credit: number;
  subscription_amount: number;
  daily_redemption_active: boolean;
  redemption_quantity: number;
  plan_variation?: PlanVariation;
}

// User Preferences Types
export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface UserStats {
  totalQuests: number;
  completedQuests: number;
  successRate: number;
}

// Navigation Types
export interface NavigationState {
  currentPage: string;
  sidebarOpen: boolean;
  activeTab: 'plans' | 'schedule' | 'profile';
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Loading States
export interface LoadingState {
  loading: boolean;
  error: string | null;
}
