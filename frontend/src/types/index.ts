export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  pagination?: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}


// Contributor Types
export interface Contributor {
  id: string;
  name: string;
  mobile: string;
  boxId: string;
  email?: string;
  address?: string;
  totalContributed: number;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
  lastContribution?: string;
}

// Collection Types
export type PaymentMode = 'cash' | 'bank_transfer' | 'upi' | 'cheque' | 'online';

export interface Collection {
  id: string;
  contributorId: string;
  contributorName: string;
  boxId: string;
  amount: number;
  date: string;
  paymentMode: PaymentMode;
  collectedBy?: string;
  notes?: string;
  status: 'collected' | 'pending' | 'cancelled';
  receiptNumber?: string;
}

// Report Types
export interface MonthlyReport {
  month: string;
  year: number;
  totalCollected: number;
  totalPending: number;
  contributorCount: number;
  collectionCount: number;
}

export interface DashboardStats {
  totalContributors: number;
  activeContributors: number;
  totalCollected: number;
  pendingAmount: number;
  thisMonthCollection: number;
  lastMonthCollection: number;
  growthPercentage: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'whatsapp' | 'sms' | 'email';
  recipientId: string;
  recipientName: string;
  message: string;
  status: 'sent' | 'pending' | 'failed';
  sentAt?: string;
  createdAt: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}


export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}



export interface AnalyticsData {
  date: string;
  completed: number;
  created: number;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface FormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}