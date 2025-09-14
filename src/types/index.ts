export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  accountNumber: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: 'debit' | 'credit';
  description: string;
  date: Date;
  category: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsGoal: number;
}

export interface WorkCertificate {
  employeeName: string;
  birthDate: string;
  birthPlace: string;
  hireDate: string;
  position: string;
  department: string;
  certificateNumber: string;
  issueDate: string;
  issueLocation: string;
}