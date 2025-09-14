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

export interface WorkPosition {
  id: string;
  position: string;
  assignment: string;
  startDate: Date;
  endDate: Date;
}

export interface WorkCertificateRequest {
  id: string;
  employeeName: string;
  birthDate: Date;
  birthPlace: string;
  employmentStartDate: Date;
  employmentEndDate: Date;
  positions: WorkPosition[];
  totalExperience: string;
  requestDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  divisionNumber: string;
  certificateNumber: string;
}

export interface EmployeeInvestigation {
  id: string;
  serialNumber: number;
  fullName: string;
  birthDatePlace: string; 
  parentage: string;
  address: string;
  phoneNumber: string; 
}

export interface DairaInvestigationRequest {
  id: string;
  divisionNumber: string;
  documentNumber: string;
  requestDate: Date;
  employees: EmployeeInvestigation[];
  status: 'pending' | 'submitted' | 'in-progress' | 'completed';
  recipient: string; 
  submittedBy: string;
  remarks?: string;
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