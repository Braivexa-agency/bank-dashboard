import React from 'react';
import { InformationSheet } from '@/stores/dataStore';
import { Card, CardContent } from '@/components/ui/card';

interface DetailedWorkCertificateProps {
  employee: InformationSheet;
}

interface WorkPosition {
  id: string;
  position: string;
  assignment: string;
  startDate: string;
  endDate: string;
}

const DetailedWorkCertificate: React.FC<DetailedWorkCertificateProps> = ({ employee }) => {
  // Format date to French format (DD/MM/YYYY)
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Generate sample work positions for demonstration
  const generateWorkPositions = (): WorkPosition[] => {
    // In a real implementation, this would come from employee data
    return [
      {
        id: '1',
        position: 'Analyste Junior',
        assignment: 'Département Crédit',
        startDate: '2020-01-15',
        endDate: '2021-06-30'
      },
      {
        id: '2',
        position: 'Analyste Senior',
        assignment: 'Gestion des Risques',
        startDate: '2021-07-01',
        endDate: '2023-03-31'
      },
      {
        id: '3',
        position: 'Chef d\'Équipe',
        assignment: 'Opérations',
        startDate: '2023-04-01',
        endDate: '2024-12-31'
      },
      {
        id: '4',
        position: '',
        assignment: '',
        startDate: '',
        endDate: ''
      }
    ];
  };

  const workPositions = generateWorkPositions();

  // Calculate total experience
  const calculateExperience = (hireDate: string) => {
    if (!hireDate) return '';
    const hire = new Date(hireDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - hire.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    
    if (diffYears > 0) {
      return `${diffYears} année${diffYears > 1 ? 's' : ''} et ${diffMonths} mois`;
    }
    return `${diffMonths} mois`;
  };

  return (
    <div className="font-serif leading-relaxed bg-white text-black dark:bg-black dark:text-white print:bg-white print:text-black">
      <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 print:bg-white print:border-none">
        <CardContent className="p-8 print:p-4">
          <div className="flex justify-between mb-12 text-sm print:mb-8">
            <div className="left">
              <p className="m-0 leading-relaxed">
                Division<br />
                « 012 »<br />
                N° ______ / D / 2025
              </p>
            </div>
            <div className="right">
              <p className="m-0">Alger le : ____/____/2025</p>
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold underline mb-12 mt-8 print:text-xl print:mb-8 print:mt-4">
            CERTIFICAT DE TRAVAIL
          </h2>

          <div className="text-base print:text-sm">
            <p className="mb-6 print:mb-4">Nous, <strong>Banque</strong> certifions que :</p>

            <p className="mb-4 print:mb-2">
              <strong>Monsieur/Madame :</strong> {employee.prenom} {employee.nom}
            </p>
            
            <p className="mb-4 print:mb-2">
              <strong>Né(e) le :</strong> {formatDate(employee.dateOfBirth)} à _____________________
            </p>
            
            <p className="mb-4 print:mb-2">
              A fait partie des effectifs de la Banque du : {formatDate(employee.hireDate)} au ____________
            </p>
            
            <p className="mb-6 print:mb-4">et a occupé les fonctions suivantes :</p>

            <div className="my-8 print:my-4">
              <table className="w-full border-collapse border border-black dark:border-white print:border-black">
                <thead>
                  <tr>
                    <th className="border border-black dark:border-white print:border-black p-2 text-center font-bold">Postes Occupé</th>
                    <th className="border border-black dark:border-white print:border-black p-2 text-center font-bold">Affectation</th>
                    <th className="border border-black dark:border-white print:border-black p-2 text-center font-bold">Du</th>
                    <th className="border border-black dark:border-white print:border-black p-2 text-center font-bold">Au</th>
                  </tr>
                </thead>
                <tbody>
                  {workPositions.map((position) => (
                    <tr key={position.id}>
                      <td className="border border-black dark:border-white print:border-black p-2 text-center">
                        {position.position}
                      </td>
                      <td className="border border-black dark:border-white print:border-black p-2 text-center">
                        {position.assignment}
                      </td>
                      <td className="border border-black dark:border-white print:border-black p-2 text-center">
                        {position.startDate ? formatDate(position.startDate) : ''}
                      </td>
                      <td className="border border-black dark:border-white print:border-black p-2 text-center">
                        {position.endDate ? formatDate(position.endDate) : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 print:mt-4 mb-6 print:mb-4">
              <strong>Total Expérience à la Banque :</strong> {calculateExperience(employee.hireDate)}
            </p>

            <p className="font-bold text-center mt-12 print:mt-8">
              Le présent certificat est établi pour servir et valoir ce que de droit.
            </p>
          </div>

          <div className="mt-16 text-center print:mt-8">
            <p className="m-0">Signature de l'autorité compétente</p>
            <p className="mt-16 print:mt-8 border-t border-black dark:border-white pt-2 w-64 mx-auto print:border-black">________________________</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedWorkCertificate;