export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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

// Wilaya Investigation interfaces
export interface WilayaEmployeeInvestigation {
  id: string;
  serialNumber: number;
  fullName: string; // الاسم واللقب
  birthDatePlace: string; // تاريخ و مكان الميلاد
  parentage: string; // النسب (الأبوين)
  address: string; // العنوان
  phoneNumber: string; // الهاتف
  employmentStatus?: 'hired' | 'pending' | 'rejected';
  position?: string;
  department?: string;
}

export interface WilayaInvestigationRequest {
  id: string;
  divisionNumber: string;
  documentNumber: string;
  requestDate: Date;
  employees: WilayaEmployeeInvestigation[];
  status: 'pending' | 'submitted' | 'in-progress' | 'completed' | 'cancelled';
  securityDirectorate: string; 
  wilayaName: string; 
  submittedBy: string;
  purpose: string;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Form validation interfaces
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}