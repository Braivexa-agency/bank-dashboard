import React, { useState, useEffect } from 'react';
import { DairaInvestigationRequest, EmployeeInvestigation } from '../types';
import './DairaInvestigation.css';

const DairaInvestigation: React.FC = () => {
  const [investigationRequest, setInvestigationRequest] = useState<DairaInvestigationRequest>({
    id: '1',
    divisionNumber: '012',
    documentNumber: '',
    requestDate: new Date(),
    employees: [
      {
        id: '1',
        serialNumber: 1,
        fullName: '',
        birthDatePlace: '',
        parentage: '',
        address: '',
        phoneNumber: '',
      },
      {
        id: '2',
        serialNumber: 2,
        fullName: '',
        birthDatePlace: '',
        parentage: '',
        address: '',
        phoneNumber: '',
      },
    ],
    status: 'pending',
    recipient: 'الوالي المنتدب للمقاطعة الإدارية',
    submittedBy: 'Bank Administration',
    remarks: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load existing data or set mock data
    setInvestigationRequest(prev => ({
      ...prev,
      documentNumber: `${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}/D/25`,
      employees: [
        {
          id: '1',
          serialNumber: 1,
          fullName: 'أحمد محمد علي',
          birthDatePlace: '15/03/1985 - الجزائر',
          parentage: 'محمد علي و فاطمة زهرة',
          address: 'شارع الاستقلال، الجزائر العاصمة',
          phoneNumber: '0555123456',
        },
        {
          id: '2',
          serialNumber: 2,
          fullName: 'سارة عبد الرحمن',
          birthDatePlace: '22/07/1990 - وهران',
          parentage: 'عبد الرحمن حسن و عائشة محمد',
          address: 'حي الأمير عبد القادر، وهران',
          phoneNumber: '0666789012',
        },
      ],
    }));
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-DZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const handleInputChange = (field: keyof DairaInvestigationRequest, value: string | Date) => {
    setInvestigationRequest(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEmployeeChange = (index: number, field: keyof EmployeeInvestigation, value: string | number) => {
    setInvestigationRequest(prev => ({
      ...prev,
      employees: prev.employees.map((employee, i) => 
        i === index ? { ...employee, [field]: value } : employee
      ),
    }));
  };

  const addEmployee = () => {
    const newEmployee: EmployeeInvestigation = {
      id: `emp_${Date.now()}`,
      serialNumber: investigationRequest.employees.length + 1,
      fullName: '',
      birthDatePlace: '',
      parentage: '',
      address: '',
      phoneNumber: '',
    };
    
    setInvestigationRequest(prev => ({
      ...prev,
      employees: [...prev.employees, newEmployee],
    }));
  };

  const removeEmployee = (index: number) => {
    if (investigationRequest.employees.length > 1) {
      setInvestigationRequest(prev => ({
        ...prev,
        employees: prev.employees.filter((_, i) => i !== index)
          .map((emp, i) => ({ ...emp, serialNumber: i + 1 })),
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Submitting investigation request:', investigationRequest);
    setInvestigationRequest(prev => ({ ...prev, status: 'submitted' }));
    setIsEditing(false);
    alert('طلب التحقيقات الإدارية تم إرساله بنجاح!');
  };

  const downloadDocument = () => {
    alert('تم تحميل الوثيقة!');
  };

  return (
    <div className="daira-investigation-page">
      <div className="investigation-header">
        <h1>Administrative Investigation Request</h1>
        <h2 className="arabic-title">طلب التحقيقات الإدارية</h2>
        <div className="investigation-actions">
          <button 
            className={isEditing ? 'btn-secondary' : 'btn-primary'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Request'}
          </button>
          {!isEditing && (
            <button className="btn-success" onClick={downloadDocument}>
              Download PDF
            </button>
          )}
        </div>
      </div>

      <div className="investigation-content">
        <div className="investigation-document">
          <div className="document-header-arabic">
            <div className="header-right">
              <p>Division</p>
              <p className="division-number">« {investigationRequest.divisionNumber} »</p>
              <p>N° 
                {isEditing ? (
                  <input
                    type="text"
                    value={investigationRequest.documentNumber}
                    onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                    className="form-input inline"
                  />
                ) : (
                  <span className="form-value">{investigationRequest.documentNumber}</span>
                )}
              </p>
            </div>
            <div className="header-left">
              <p>الجزائر في {formatDate(investigationRequest.requestDate)}</p>
            </div>
          </div>

          <div className="document-body-arabic">
            <p className="recipient-line">
              الى السيد : 
              {isEditing ? (
                <input
                  type="text"
                  value={investigationRequest.recipient}
                  onChange={(e) => handleInputChange('recipient', e.target.value)}
                  className="form-input inline arabic-input"
                />
              ) : (
                <span className="form-value">{investigationRequest.recipient}</span>
              )}
            </p>

            <p className="subject-line">الموضوع: طلب التحقيقات الإدارية</p>

            <p className="content-paragraph">
              لنا الشرف العظيم أن نتقدم إلى سيادتكم بطلبنا هذا و المتمثل في طلب اجراء التحقيقات الإدارية الخاصة بالموظفين المبينين في الجدول المرفق.
            </p>

            <p className="closing-paragraph">
              في انتظار ردكم تقبلوا منا سيدي فائق التقدير و الاحترام.
            </p>
          </div>

          <div className="employees-section">
            <div className="section-header">
              <h3>الجدول:</h3>
              {isEditing && (
                <div className="table-actions">
                  <button className="btn-small" onClick={addEmployee}>
                    Add Employee
                  </button>
                </div>
              )}
            </div>
            
            <div className="table-container">
              <table className="employees-table">
                <thead>
                  <tr>
                    <th>الرقم</th>
                    <th>الاسم و اللقب</th>
                    <th>تاريخ و مكان الميلاد</th>
                    <th>النسب (الأبوين)</th>
                    <th>العنوان</th>
                    <th>الهاتف</th>
                    {isEditing && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {investigationRequest.employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{employee.serialNumber.toString().padStart(2, '0')}</td>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={employee.fullName}
                            onChange={(e) => handleEmployeeChange(index, 'fullName', e.target.value)}
                            className="table-input arabic-input"
                            placeholder="الاسم و اللقب"
                          />
                        ) : (
                          employee.fullName || ''
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={employee.birthDatePlace}
                            onChange={(e) => handleEmployeeChange(index, 'birthDatePlace', e.target.value)}
                            className="table-input arabic-input"
                            placeholder="تاريخ و مكان الميلاد"
                          />
                        ) : (
                          employee.birthDatePlace || ''
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={employee.parentage}
                            onChange={(e) => handleEmployeeChange(index, 'parentage', e.target.value)}
                            className="table-input arabic-input"
                            placeholder="النسب (الأبوين)"
                          />
                        ) : (
                          employee.parentage || ''
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={employee.address}
                            onChange={(e) => handleEmployeeChange(index, 'address', e.target.value)}
                            className="table-input arabic-input"
                            placeholder="العنوان"
                          />
                        ) : (
                          employee.address || ''
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={employee.phoneNumber}
                            onChange={(e) => handleEmployeeChange(index, 'phoneNumber', e.target.value)}
                            className="table-input"
                            placeholder="الهاتف"
                          />
                        ) : (
                          employee.phoneNumber || ''
                        )}
                      </td>
                      {isEditing && (
                        <td>
                          <button 
                            className="btn-small btn-danger"
                            onClick={() => removeEmployee(index)}
                            disabled={investigationRequest.employees.length <= 1}
                          >
                            Remove
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isEditing && (
              <div className="submit-section">
                <button className="btn-primary" onClick={handleSubmit}>
                  Submit Investigation Request
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="request-status">
          <h3>Request Status</h3>
          <div className={`status-badge ${investigationRequest.status}`}>
            {investigationRequest.status.charAt(0).toUpperCase() + investigationRequest.status.slice(1)}
          </div>
          <p>Request date: {formatDate(investigationRequest.requestDate)}</p>
          <p>Document number: {investigationRequest.documentNumber}</p>
          <p>Employees count: {investigationRequest.employees.length}</p>
          
          {investigationRequest.remarks && (
            <div className="remarks-section">
              <h4>Remarks:</h4>
              <p>{investigationRequest.remarks}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DairaInvestigation;