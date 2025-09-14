import React, { useState } from 'react';
import { WorkCertificate } from '../types';
import './WorkCertificate.css';

const WorkCertificatePage: React.FC = () => {
  const [certificate, setCertificate] = useState<WorkCertificate>({
    employeeName: '',
    birthDate: '',
    birthPlace: '',
    hireDate: '',
    position: '',
    department: '',
    certificateNumber: '',
    issueDate: new Date().toLocaleDateString('fr-FR'),
    issueLocation: 'Alger',
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleInputChange = (field: keyof WorkCertificate, value: string) => {
    setCertificate(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const generateCertificateNumber = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${randomNum}/${year}`;
  };

  const handleGenerateNumber = () => {
    setCertificate(prev => ({
      ...prev,
      certificateNumber: generateCertificateNumber(),
    }));
  };

  const isFormComplete = () => {
    return certificate.employeeName &&
           certificate.birthDate &&
           certificate.birthPlace &&
           certificate.hireDate &&
           certificate.position &&
           certificate.department &&
           certificate.certificateNumber;
  };

  if (isPreviewMode) {
    return (
      <div className="certificate-preview">
        <div className="preview-controls no-print">
          <button onClick={() => setIsPreviewMode(false)} className="btn-secondary">
            ← Retour à l'édition
          </button>
          <button onClick={handlePrint} className="btn-primary">
            🖨️ Imprimer
          </button>
        </div>
        
        <div className="certificate-document">
          <div className="document-header">
            <div className="header-left">
              DIRECTION DES<br />
              DEPARTEMENT ADMINISTRATION<br />
              N° {certificate.certificateNumber}/2025
            </div>
            <div className="header-right">
              {certificate.issueLocation}, le {certificate.issueDate}
            </div>
          </div>

          <div className="document-title">ATTESTATION DE TRAVAIL</div>

          <div className="document-content">
            NOUS SOUSSIGNÉS, Banque<br />
            <strong>BANQUE</strong> ATTESTONS QUE :<br /><br />

            MONSIEUR : <strong>{certificate.employeeName}</strong><br />
            NÉ LE : <strong>{certificate.birthDate}</strong> à <strong>{certificate.birthPlace}</strong><br /><br />

            FAIT PARTIE DE NOTRE PERSONNEL DEPUIS LE : <strong>{certificate.hireDate}</strong><br /><br />

            ET OCCUPE LA FONCTION PERMANENTE SUIVANTE : <strong>{certificate.position}</strong><br /><br />

            STRUCTURE : <strong>{certificate.department}</strong><br /><br />

            LA PRÉSENTE ATTESTATION EST DÉLIVRÉE POUR SERVIR ET VALOIR CE QUE DE DROIT.
          </div>

          <div className="document-signature">
            <div className="signature-block">
              <p>Le Directeur</p>
              <div className="signature-line"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="work-certificate-page">
      <div className="certificate-header">
        <h1>Attestation de Travail</h1>
        <p className="page-description">Générer une attestation de travail pour un employé</p>
      </div>

      <div className="certificate-form">
        <div className="form-section">
          <h2>Informations sur l'employé</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="employeeName">Nom complet de l'employé *</label>
              <input
                type="text"
                id="employeeName"
                value={certificate.employeeName}
                onChange={(e) => handleInputChange('employeeName', e.target.value)}
                placeholder="Ex: DUPONT Jean"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="birthDate">Date de naissance *</label>
              <input
                type="date"
                id="birthDate"
                value={certificate.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthPlace">Lieu de naissance *</label>
              <input
                type="text"
                id="birthPlace"
                value={certificate.birthPlace}
                onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                placeholder="Ex: Paris"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Informations professionnelles</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hireDate">Date d'embauche *</label>
              <input
                type="date"
                id="hireDate"
                value={certificate.hireDate}
                onChange={(e) => handleInputChange('hireDate', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="position">Fonction/Poste *</label>
              <input
                type="text"
                id="position"
                value={certificate.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="Ex: Conseiller Clientèle"
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Département/Structure *</label>
              <input
                type="text"
                id="department"
                value={certificate.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="Ex: Service Commercial"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Informations du document</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="certificateNumber">Numéro d'attestation *</label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="certificateNumber"
                  value={certificate.certificateNumber}
                  onChange={(e) => handleInputChange('certificateNumber', e.target.value)}
                  placeholder="Ex: 001/2025"
                />
                <button 
                  type="button" 
                  onClick={handleGenerateNumber}
                  className="btn-generate"
                >
                  Générer
                </button>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="issueDate">Date d'émission</label>
              <input
                type="date"
                id="issueDate"
                value={certificate.issueDate}
                onChange={(e) => handleInputChange('issueDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="issueLocation">Lieu d'émission</label>
              <input
                type="text"
                id="issueLocation"
                value={certificate.issueLocation}
                onChange={(e) => handleInputChange('issueLocation', e.target.value)}
                placeholder="Ex: Alger"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            onClick={() => setIsPreviewMode(true)}
            disabled={!isFormComplete()}
            className="btn-primary"
          >
            Aperçu de l'attestation
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkCertificatePage;