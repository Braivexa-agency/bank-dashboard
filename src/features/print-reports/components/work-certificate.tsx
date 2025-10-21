import React from 'react';
import { InformationSheet } from '@/stores/dataStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WorkCertificateProps {
  employee: InformationSheet;
  onPrint?: () => void;
  onExportPDF?: () => void;
}

const WorkCertificate: React.FC<WorkCertificateProps> = ({ employee, onPrint, onExportPDF }) => {
  // Format date to French format (DD/MM/YYYY)
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="font-serif leading-relaxed bg-white text-black dark:bg-black dark:text-white print:bg-white print:text-black">
      {/* Only show header actions if onPrint or onExportPDF are provided (not in dialog) */}
      {(onPrint || onExportPDF) && (
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold m-0">Attestation de Travail</h1>
            <p className="text-muted-foreground">Générer et gérer les attestations de travail des employés</p>
          </div>
          <div className="flex gap-4">
            {onPrint && (
              <Button variant="outline" onClick={onPrint}>
                Imprimer
              </Button>
            )}
            {onExportPDF && (
              <Button variant="secondary" onClick={onExportPDF}>
                Exporter PDF
              </Button>
            )}
          </div>
        </div>
      )}

      <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 print:bg-white print:border-none">
        <CardContent className="p-8 print:p-4">
          <div className="flex justify-between mb-12 text-sm print:mb-8">
            <div>
              <p className="m-0 leading-relaxed">
                Direction des<br />
                Département Administration<br />
                N° ________/2025
              </p>
            </div>
            <div>
              <p className="m-0">Alger, le ____/____/2025</p>
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold underline mb-12 mt-8 print:text-xl print:mb-8 print:mt-4">
            ATTESTATION DE TRAVAIL
          </h2>

          <div className="text-base print:text-sm">
            <p className="mb-6 print:mb-4">NOUS SOUSSIGNÉS, <strong>Banque</strong> ATTESTONS QUE :</p>

            <div className="my-8 print:my-4">
              <div className="flex items-center gap-2 flex-wrap mb-4 print:mb-2">
                <label className="font-bold whitespace-nowrap"><strong>MONSIEUR/MADAME :</strong></label>
                <span className="border-b border-black dark:border-white py-1 px-2 min-w-[150px] inline-block print:border-black">
                  {employee.prenom} {employee.nom}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap mb-4 print:mb-2">
                <label className="font-bold whitespace-nowrap"><strong>NÉ(E) LE :</strong></label>
                <span className="border-b border-black dark:border-white py-1 px-2 min-w-[150px] inline-block print:border-black">
                  {formatDate(employee.dateOfBirth)}
                </span>
                <label className="font-bold"><strong>à</strong></label>
                <span className="border-b border-black dark:border-white py-1 px-2 min-w-[150px] inline-block print:border-black">
                  ________________________
                </span>
              </div>

              <div className="my-6 print:my-3">
                <p className="m-0">
                  FAIT PARTIE DE NOTRE PERSONNEL DEPUIS LE : 
                  <span className="border-b border-black dark:border-white py-1 px-2 mx-2 inline-block print:border-black">
                    {formatDate(employee.hireDate)}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap mb-4 print:mb-2">
                <label className="font-bold whitespace-nowrap"><strong>ET OCCUPE LA FONCTION PERMANENTE SUIVANTE :</strong></label>
                <span className="border-b border-black dark:border-white py-1 px-2 min-w-[150px] inline-block print:border-black">
                  {employee.currentPosition || '________________________'}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap mb-4 print:mb-2">
                <label className="font-bold whitespace-nowrap"><strong>STRUCTURE :</strong></label>
                <span className="border-b border-black dark:border-white py-1 px-2 min-w-[150px] inline-block print:border-black">
                  {employee.structure || '________________________'}
                </span>
              </div>
            </div>

            <p className="font-bold text-center mt-12 print:mt-8">
              LA PRÉSENTE ATTESTATION EST DÉLIVRÉE POUR SERVIR ET VALOIR CE QUE DE DROIT.
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

export default WorkCertificate;