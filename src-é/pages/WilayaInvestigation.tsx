import React, { useState, useCallback, useMemo } from 'react';
import { 
  WilayaInvestigationRequest, 
  WilayaEmployeeInvestigation, 
  ValidationError, 
  FormValidationResult 
} from '../types';
import { Button } from '@/components/ui/button';
import ResponsivePageWrapper from '@/components/ResponsivePageWrapper';
import './WilayaInvestigation.css';

// Constants for business logic
const WILAYA_CONSTANTS = {
  DIVISION_CODE: '012',
  MAX_EMPLOYEES_PER_REQUEST: 50,
  MIN_EMPLOYEES_PER_REQUEST: 1,
  WILAYA_NAME: 'الجزائر',
  SECURITY_DIRECTORATE: 'مديرية الأمن الإداري لولاية الجزائر',
  DEFAULT_PURPOSE: 'طلب تحقيق للمعنيين المدونة أسماؤهم في الجدول والذي تم توظيفهم لدى'
} as const;

// Custom hooks for separation of concerns
const useWilayaInvestigation = () => {
  const [request, setRequest] = useState<WilayaInvestigationRequest>(() => ({
    id: crypto.randomUUID(),
    divisionNumber: WILAYA_CONSTANTS.DIVISION_CODE,
    documentNumber: '',
    requestDate: new Date(),
    employees: [createEmptyEmployee(1)],
    status: 'pending',
    securityDirectorate: WILAYA_CONSTANTS.SECURITY_DIRECTORATE,
    wilayaName: WILAYA_CONSTANTS.WILAYA_NAME,
    submittedBy: '',
    purpose: WILAYA_CONSTANTS.DEFAULT_PURPOSE,
    remarks: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateRequest = useCallback((updates: Partial<WilayaInvestigationRequest>) => {
    setRequest(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date()
    }));
    setValidationErrors([]);
  }, []);

  return {
    request,
    setRequest,
    updateRequest,
    validationErrors,
    setValidationErrors,
    isSubmitting,
    setIsSubmitting,
    submitSuccess,
    setSubmitSuccess
  };
};

const useEmployeeManagement = (
  employees: WilayaEmployeeInvestigation[],
  updateRequest: (updates: Partial<WilayaInvestigationRequest>) => void
) => {
  const addEmployee = useCallback(() => {
    if (employees.length >= WILAYA_CONSTANTS.MAX_EMPLOYEES_PER_REQUEST) {
      alert(`Maximum ${WILAYA_CONSTANTS.MAX_EMPLOYEES_PER_REQUEST} employees allowed`);
      return;
    }
    
    const newEmployee = createEmptyEmployee(employees.length + 1);
    updateRequest({ employees: [...employees, newEmployee] });
  }, [employees, updateRequest]);

  const removeEmployee = useCallback((id: string) => {
    if (employees.length <= WILAYA_CONSTANTS.MIN_EMPLOYEES_PER_REQUEST) {
      alert('At least one employee is required');
      return;
    }

    const filteredEmployees = employees
      .filter(emp => emp.id !== id)
      .map((emp, index) => ({ ...emp, serialNumber: index + 1 }));
    
    updateRequest({ employees: filteredEmployees });
  }, [employees, updateRequest]);

  const updateEmployee = useCallback((id: string, updates: Partial<WilayaEmployeeInvestigation>) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, ...updates } : emp
    );
    updateRequest({ employees: updatedEmployees });
  }, [employees, updateRequest]);

  return { addEmployee, removeEmployee, updateEmployee };
};

// Utility functions
function createEmptyEmployee(serialNumber: number): WilayaEmployeeInvestigation {
  return {
    id: crypto.randomUUID(),
    serialNumber,
    fullName: '',
    birthDatePlace: '',
    parentage: '',
    address: '',
    phoneNumber: '',
    employmentStatus: 'pending'
  };
}

// Validation utilities
const validateWilayaRequest = (request: WilayaInvestigationRequest): FormValidationResult => {
  const errors: ValidationError[] = [];

  if (!request.documentNumber.trim()) {
    errors.push({ field: 'documentNumber', message: 'Document number is required' });
  }

  if (!request.submittedBy.trim()) {
    errors.push({ field: 'submittedBy', message: 'Submitted by field is required' });
  }

  if (request.employees.length < WILAYA_CONSTANTS.MIN_EMPLOYEES_PER_REQUEST) {
    errors.push({ field: 'employees', message: 'At least one employee is required' });
  }

  // Validate each employee
  request.employees.forEach((employee, index) => {
    const fieldPrefix = `employee_${index}`;
    
    if (!employee.fullName.trim()) {
      errors.push({ 
        field: `${fieldPrefix}_fullName`, 
        message: `Employee ${index + 1}: Full name is required` 
      });
    }

    if (!employee.birthDatePlace.trim()) {
      errors.push({ 
        field: `${fieldPrefix}_birthDatePlace`, 
        message: `Employee ${index + 1}: Birth date and place is required` 
      });
    }

    if (!employee.address.trim()) {
      errors.push({ 
        field: `${fieldPrefix}_address`, 
        message: `Employee ${index + 1}: Address is required` 
      });
    }

    if (employee.phoneNumber && !/^[\d\s\-+()]+$/.test(employee.phoneNumber)) {
      errors.push({ 
        field: `${fieldPrefix}_phoneNumber`, 
        message: `Employee ${index + 1}: Invalid phone number format` 
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

const formatDocumentNumber = (_divisionNumber: string, year: number): string => {
  return `______ / D / ${year}`;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ar-DZ', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// Sub-components
interface EmployeeRowProps {
  employee: WilayaEmployeeInvestigation;
  onUpdate: (id: string, updates: Partial<WilayaEmployeeInvestigation>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  validationErrors: ValidationError[];
}

const EmployeeRow: React.FC<EmployeeRowProps> = React.memo(({ 
  employee, 
  onUpdate, 
  onRemove, 
  canRemove,
  validationErrors 
}) => {
  const getFieldError = (fieldName: string) => {
    return validationErrors.find(error => 
      error.field === `employee_${employee.serialNumber - 1}_${fieldName}`
    );
  };

  return (
    <tr className="employee-row">
      <td className="serial-number">{employee.serialNumber}</td>
      <td>
        <input
          type="text"
          value={employee.fullName}
          onChange={(e) => onUpdate(employee.id, { fullName: e.target.value })}
          placeholder="الاسم الكامل"
          className={getFieldError('fullName') ? 'error' : ''}
          dir="rtl"
        />
        {getFieldError('fullName') && (
          <span className="error-message">{getFieldError('fullName')?.message}</span>
        )}
      </td>
      <td>
        <input
          type="text"
          value={employee.birthDatePlace}
          onChange={(e) => onUpdate(employee.id, { birthDatePlace: e.target.value })}
          placeholder="تاريخ ومكان الميلاد"
          className={getFieldError('birthDatePlace') ? 'error' : ''}
          dir="rtl"
        />
        {getFieldError('birthDatePlace') && (
          <span className="error-message">{getFieldError('birthDatePlace')?.message}</span>
        )}
      </td>
      <td>
        <input
          type="text"
          value={employee.parentage}
          onChange={(e) => onUpdate(employee.id, { parentage: e.target.value })}
          placeholder="النسب (الأبوين)"
          dir="rtl"
        />
      </td>
      <td>
        <input
          type="text"
          value={employee.address}
          onChange={(e) => onUpdate(employee.id, { address: e.target.value })}
          placeholder="العنوان"
          className={getFieldError('address') ? 'error' : ''}
          dir="rtl"
        />
        {getFieldError('address') && (
          <span className="error-message">{getFieldError('address')?.message}</span>
        )}
      </td>
      <td>
        <input
          type="tel"
          value={employee.phoneNumber}
          onChange={(e) => onUpdate(employee.id, { phoneNumber: e.target.value })}
          placeholder="رقم الهاتف"
          className={getFieldError('phoneNumber') ? 'error' : ''}
          dir="ltr"
        />
        {getFieldError('phoneNumber') && (
          <span className="error-message">{getFieldError('phoneNumber')?.message}</span>
        )}
      </td>
      <td>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(employee.id)}
            className="remove-button"
            aria-label={`Remove employee ${employee.fullName || employee.serialNumber}`}
          >
            حذف
          </button>
        )}
      </td>
    </tr>
  );
});

EmployeeRow.displayName = 'EmployeeRow';

// Main component
const WilayaInvestigation: React.FC = () => {
  const {
    request,
    updateRequest,
    validationErrors,
    setValidationErrors,
    isSubmitting,
    setIsSubmitting,
    submitSuccess,
    setSubmitSuccess
  } = useWilayaInvestigation();

  const { addEmployee, removeEmployee, updateEmployee } = useEmployeeManagement(
    request.employees,
    updateRequest
  );

  // Memoized calculations
  const documentNumber = useMemo(() => 
    formatDocumentNumber(request.divisionNumber, request.requestDate.getFullYear()),
    [request.divisionNumber, request.requestDate]
  );

  const formattedDate = useMemo(() => 
    formatDate(request.requestDate),
    [request.requestDate]
  );

  const canAddEmployee = useMemo(() => 
    request.employees.length < WILAYA_CONSTANTS.MAX_EMPLOYEES_PER_REQUEST,
    [request.employees.length]
  );

  const canRemoveEmployee = useMemo(() => 
    request.employees.length > WILAYA_CONSTANTS.MIN_EMPLOYEES_PER_REQUEST,
    [request.employees.length]
  );

  // Event handlers
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const validation = validateWilayaRequest(request);
      
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Wilaya investigation request submitted:', request);
      setSubmitSuccess(true);
      setValidationErrors([]);
      
      // Reset form after successful submission
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      setValidationErrors([{
        field: 'general',
        message: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.'
      }]);
    } finally {
      setIsSubmitting(false);
    }
  }, [request, setValidationErrors, setIsSubmitting, setSubmitSuccess]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleExportPDF = useCallback(() => {
    // This would integrate with a PDF generation library
    alert('PDF export functionality would be implemented here');
  }, []);

  // General validation errors
  const generalErrors = validationErrors.filter(error => 
    !error.field.startsWith('employee_') && error.field !== 'employees'
  );

  return (
    <ResponsivePageWrapper>
      <div className="wilaya-investigation-page">
        <div className="page-header">
          <div>
            <h1>Wilaya Administrative Investigation Request</h1>
            <h2 className="arabic-title">طلب تحقيق إداري - الولاية</h2>
          </div>
          <div className="button-group">
            <Button 
              onClick={handlePrint}
              variant="outline"
              disabled={isSubmitting}
            >
              طباعة
            </Button>
            <Button 
              onClick={handleExportPDF}
              variant="secondary"
              disabled={isSubmitting}
            >
              تصدير PDF
            </Button>
          </div>
        </div>

      {submitSuccess && (
        <div className="success-message" role="alert">
          تم إرسال طلب التحقيق بنجاح
        </div>
      )}

      {generalErrors.length > 0 && (
        <div className="error-summary" role="alert">
          <h3>يرجى تصحيح الأخطاء التالية:</h3>
          <ul>
            {generalErrors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="investigation-form">
        <div className="document-header">
          <div className="header-left">
            <div className="division-info">
              <p>Division</p>
              <p>« {request.divisionNumber} »</p>
              <p>N° {documentNumber}</p>
            </div>
          </div>
          <div className="header-right">
            <div className="date-location">
              <p>{request.wilayaName} في {formattedDate}</p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="security-directorate">
            <h3>{request.securityDirectorate}</h3>
          </div>
          
          <div className="subject-section">
            <h4>الموضوع: طلب تحقيق إداري</h4>
          </div>

          <div className="form-fields">
            <div className="field-group">
              <label htmlFor="documentNumber">رقم الوثيقة:</label>
              <input
                type="text"
                id="documentNumber"
                value={request.documentNumber}
                onChange={(e) => updateRequest({ documentNumber: e.target.value })}
                className={validationErrors.some(e => e.field === 'documentNumber') ? 'error' : ''}
                dir="ltr"
              />
            </div>

            <div className="field-group">
              <label htmlFor="submittedBy">مقدم من طرف:</label>
              <input
                type="text"
                id="submittedBy"
                value={request.submittedBy}
                onChange={(e) => updateRequest({ submittedBy: e.target.value })}
                className={validationErrors.some(e => e.field === 'submittedBy') ? 'error' : ''}
                dir="rtl"
              />
            </div>

            <div className="field-group">
              <label htmlFor="purpose">الغرض:</label>
              <textarea
                id="purpose"
                value={request.purpose}
                onChange={(e) => updateRequest({ purpose: e.target.value })}
                rows={3}
                dir="rtl"
              />
            </div>
          </div>
        </div>

        <div className="employees-section">
          <div className="section-header">
            <h3>قائمة الموظفين المطلوب التحقيق معهم</h3>
            <Button
              type="button"
              onClick={addEmployee}
              disabled={!canAddEmployee || isSubmitting}
            >
              إضافة موظف
            </Button>
          </div>

          <div className="table-container">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>الرقم</th>
                  <th>الاسم واللقب</th>
                  <th>تاريخ و مكان الميلاد</th>
                  <th>النسب (الأبوين)</th>
                  <th>العنوان</th>
                  <th>الهاتف</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {request.employees.map((employee) => (
                  <EmployeeRow
                    key={employee.id}
                    employee={employee}
                    onUpdate={updateEmployee}
                    onRemove={removeEmployee}
                    canRemove={canRemoveEmployee}
                    validationErrors={validationErrors}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="form-section">
          <div className="field-group">
            <label htmlFor="remarks">ملاحظات إضافية:</label>
            <textarea
              id="remarks"
              value={request.remarks || ''}
              onChange={(e) => updateRequest({ remarks: e.target.value })}
              rows={3}
              dir="rtl"
              placeholder="أي ملاحظات أو معلومات إضافية..."
            />
          </div>
        </div>

        <div className="closing-statement">
          <p>في انتظار ردكم تقبلوا منا سيدي فائق التقدير و الاحترام.</p>
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (confirm('هل أنت متأكد من إعادة تعيين النموذج؟')) {
                window.location.reload();
              }
            }}
            disabled={isSubmitting}
          >
            إعادة تعيين
          </Button>
        </div>
      </form>
    </div>
    </ResponsivePageWrapper>
  );
};

export default WilayaInvestigation;