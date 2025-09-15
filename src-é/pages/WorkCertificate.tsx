import React, { useState, useEffect } from 'react';
import { WorkCertificateRequest, WorkPosition } from '../types';
import { Button } from '@/components/ui/button';
import ResponsivePageWrapper from '@/components/ResponsivePageWrapper';
import './WorkCertificate.css';

const WorkCertificate: React.FC = () => {
  const [certificateRequest, setCertificateRequest] = useState<WorkCertificateRequest>({
    id: '1',
    employeeName: '',
    birthDate: new Date(),
    birthPlace: '',
    employmentStartDate: new Date(),
    employmentEndDate: new Date(),
    positions: [
      { id: '1', position: '', assignment: '', startDate: new Date(), endDate: new Date() },
      { id: '2', position: '', assignment: '', startDate: new Date(), endDate: new Date() },
      { id: '3', position: '', assignment: '', startDate: new Date(), endDate: new Date() },
      { id: '4', position: '', assignment: '', startDate: new Date(), endDate: new Date() },
    ],
    totalExperience: '',
    requestDate: new Date(),
    status: 'pending',
    divisionNumber: '012',
    certificateNumber: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load existing certificate data or set defaults
    setCertificateRequest(prev => ({
      ...prev,
      employeeName: 'John Doe',
      birthDate: new Date('1985-03-15'),
      birthPlace: 'Algiers',
      employmentStartDate: new Date('2020-01-01'),
      employmentEndDate: new Date('2024-12-31'),
      totalExperience: '4 years and 11 months',
      certificateNumber: `${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}/D/2025`,
      positions: [
        {
          id: '1',
          position: 'Junior Analyst',
          assignment: 'Credit Department',
          startDate: new Date('2020-01-01'),
          endDate: new Date('2021-06-30'),
        },
        {
          id: '2',
          position: 'Senior Analyst',
          assignment: 'Risk Management',
          startDate: new Date('2021-07-01'),
          endDate: new Date('2023-03-31'),
        },
        {
          id: '3',
          position: 'Team Lead',
          assignment: 'Operations',
          startDate: new Date('2023-04-01'),
          endDate: new Date('2024-12-31'),
        },
        {
          id: '4',
          position: '',
          assignment: '',
          startDate: new Date(),
          endDate: new Date(),
        },
      ],
    }));
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleInputChange = (field: keyof WorkCertificateRequest, value: string | Date) => {
    setCertificateRequest(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePositionChange = (index: number, field: keyof WorkPosition, value: string | Date) => {
    setCertificateRequest(prev => ({
      ...prev,
      positions: prev.positions.map((position, i) => 
        i === index ? { ...position, [field]: value } : position
      ),
    }));
  };

  const handleSubmit = () => {
    // In a real app, this would make an API call
    console.log('Submitting certificate request:', certificateRequest);
    setCertificateRequest(prev => ({ ...prev, status: 'pending' }));
    setIsEditing(false);
    alert('Certificate request submitted successfully!');
  };

  const downloadCertificate = () => {
    // In a real app, this would generate and download a PDF
    alert('Certificate downloaded!');
  };

  return (
    <ResponsivePageWrapper>
      <div className="work-certificate-page">
        <div className="page-header">
          <div>
            <h1>Work Certificate Request</h1>
            <p className="text-muted-foreground">Generate and manage employee work certificates</p>
          </div>
          <div className="button-group">
            <Button 
              variant={isEditing ? 'outline' : 'default'}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Request'}
            </Button>
            {!isEditing && (
              <Button variant="secondary" onClick={downloadCertificate}>
                Download PDF
              </Button>
            )}
          </div>
        </div>

      <div className="certificate-content">
        <div className="certificate-document">
          <div className="document-header">
            <div className="division-info">
              <p>Division<br />
                « {certificateRequest.divisionNumber} »<br />
                N° {certificateRequest.certificateNumber}
              </p>
            </div>
            <div className="date-info">
              <p>Alger le : {formatDate(certificateRequest.requestDate)}</p>
            </div>
          </div>

          <h2 className="document-title">CERTIFICAT DE TRAVAIL</h2>

          <div className="certificate-body">
            <p>Nous, <strong>Banque</strong> certifions que :</p>

            <div className="employee-info">
              <div className="form-row">
                <label><strong>Monsieur/Madame :</strong></label>
                {isEditing ? (
                  <input
                    type="text"
                    value={certificateRequest.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                    className="form-input"
                  />
                ) : (
                  <span className="form-value">{certificateRequest.employeeName}</span>
                )}
              </div>

              <div className="form-row">
                <label><strong>Né(e) le :</strong></label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formatDateForInput(certificateRequest.birthDate)}
                    onChange={(e) => handleInputChange('birthDate', new Date(e.target.value))}
                    className="form-input"
                  />
                ) : (
                  <span className="form-value">{formatDate(certificateRequest.birthDate)}</span>
                )}
                <label><strong>à</strong></label>
                {isEditing ? (
                  <input
                    type="text"
                    value={certificateRequest.birthPlace}
                    onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                    className="form-input"
                  />
                ) : (
                  <span className="form-value">{certificateRequest.birthPlace}</span>
                )}
              </div>

              <div className="employment-period">
                <p>A fait partie des effectifs de la Banque du : 
                  {isEditing ? (
                    <input
                      type="date"
                      value={formatDateForInput(certificateRequest.employmentStartDate)}
                      onChange={(e) => handleInputChange('employmentStartDate', new Date(e.target.value))}
                      className="form-input inline"
                    />
                  ) : (
                    <span className="form-value">{formatDate(certificateRequest.employmentStartDate)}</span>
                  )}
                  {' '}au{' '}
                  {isEditing ? (
                    <input
                      type="date"
                      value={formatDateForInput(certificateRequest.employmentEndDate)}
                      onChange={(e) => handleInputChange('employmentEndDate', new Date(e.target.value))}
                      className="form-input inline"
                    />
                  ) : (
                    <span className="form-value">{formatDate(certificateRequest.employmentEndDate)}</span>
                  )}
                </p>
              </div>
            </div>

            <p>et a occupé les fonctions suivantes :</p>

            <div className="positions-table">
              <table>
                <thead>
                  <tr>
                    <th>Postes Occupé</th>
                    <th>Affectation</th>
                    <th>Du</th>
                    <th>Au</th>
                  </tr>
                </thead>
                <tbody>
                  {certificateRequest.positions.map((position, index) => (
                    <tr key={position.id}>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={position.position}
                            onChange={(e) => handlePositionChange(index, 'position', e.target.value)}
                            className="table-input"
                          />
                        ) : (
                          position.position
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={position.assignment}
                            onChange={(e) => handlePositionChange(index, 'assignment', e.target.value)}
                            className="table-input"
                          />
                        ) : (
                          position.assignment
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="date"
                            value={formatDateForInput(position.startDate)}
                            onChange={(e) => handlePositionChange(index, 'startDate', new Date(e.target.value))}
                            className="table-input"
                          />
                        ) : (
                          position.position ? formatDate(position.startDate) : ''
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="date"
                            value={formatDateForInput(position.endDate)}
                            onChange={(e) => handlePositionChange(index, 'endDate', new Date(e.target.value))}
                            className="table-input"
                          />
                        ) : (
                          position.position ? formatDate(position.endDate) : ''
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="total-experience">
              <p><strong>Total Expérience à la Banque :</strong> 
                {isEditing ? (
                  <input
                    type="text"
                    value={certificateRequest.totalExperience}
                    onChange={(e) => handleInputChange('totalExperience', e.target.value)}
                    className="form-input inline"
                  />
                ) : (
                  <span className="form-value">{certificateRequest.totalExperience}</span>
                )}
              </p>
            </div>

            <p className="certificate-footer">
              Le présent certificat est établi pour servir et valoir ce que de droit.
            </p>

            {isEditing && (
              <div className="submit-section">
                <button className="btn-primary" onClick={handleSubmit}>
                  Submit Certificate Request
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="request-status">
          <h3>Request Status</h3>
          <div className={`status-badge ${certificateRequest.status}`}>
            {certificateRequest.status.charAt(0).toUpperCase() + certificateRequest.status.slice(1)}
          </div>
          <p>Request submitted on: {formatDate(certificateRequest.requestDate)}</p>
        </div>
      </div>
    </div>
    </ResponsivePageWrapper>
  );
};

export default WorkCertificate;