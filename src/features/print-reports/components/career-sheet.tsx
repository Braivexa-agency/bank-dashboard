import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { InformationSheet } from '@/stores/dataStore'

interface CareerSheetProps {
  employee: InformationSheet
}

const CareerSheet: React.FC<CareerSheetProps> = ({ employee }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR')
  }

  return (
    <div className="font-serif leading-relaxed bg-white text-black dark:bg-black dark:text-white print:bg-white print:text-black">
      <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 print:bg-white print:border-none">
        <CardContent className="p-8 print:p-4">
          <h2 className="text-center text-2xl font-bold underline mb-6">FICHE DE CARRIÈRE</h2>

          <div className="flex flex-wrap justify-between text-sm gap-y-2 mb-6">
            <div><span className="font-semibold">Nom :</span> {employee.nom || ''}</div>
            <div><span className="font-semibold">Prénom :</span> {employee.prenom || ''}</div>
            <div><span className="font-semibold">Date de Naissance :</span> {formatDate(employee.dateOfBirth)}</div>
            <div><span className="font-semibold">Date de Recrutement :</span> {formatDate(employee.hireDate)}</div>
            <div><span className="font-semibold">Affectation :</span> {employee.affectation || ''}</div>
            <div><span className="font-semibold">Poste Occupé :</span> {employee.poste || employee.currentPosition || ''}</div>
            <div><span className="font-semibold">Durée :</span> {employee.duree || ''}</div>
            <div><span className="font-semibold">Réseau :</span> {employee.structureType || ''}</div>
            <div><span className="font-semibold">Niveau d'Instruction :</span> {employee.educationLevel || ''}</div>
            <div><span className="font-semibold">Diplôme Académique :</span> {employee.academicDiploma || ''}</div>
          </div>

          <h2 className="text-center text-xl font-bold underline mb-3">Expériences Professionnelles à la Banque</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-black border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th className="border border-black p-2">Poste Occupé</th>
                  <th className="border border-black p-2">Affectation</th>
                  <th className="border border-black p-2">Cat</th>
                  <th className="border border-black p-2">S/E</th>
                  <th className="border border-black p-2">PBI</th>
                  <th className="border border-black p-2">Nature Décision</th>
                  <th className="border border-black p-2">Réf Décision</th>
                  <th className="border border-black p-2">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2">{employee.poste || employee.currentPosition || ''}</td>
                  <td className="border border-black p-2">{employee.affectation || ''}</td>
                  <td className="border border-black p-2">{employee.classe || ''}</td>
                  <td className="border border-black p-2">{employee.echelon || ''}</td>
                  <td className="border border-black p-2">{typeof employee.pbi === 'number' ? employee.pbi : ''}</td>
                  <td className="border border-black p-2">{employee.natureDecision || employee.decisionType || ''}</td>
                  <td className="border border-black p-2">{employee.refDecision || employee.decisionNumber || ''}</td>
                  <td className="border border-black p-2">{employee.duree || ''}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-center text-xl font-bold underline mb-3">Formation Professionnelle</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-black border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th className="border border-black p-2">Spécialité</th>
                  <th className="border border-black p-2">Établissement</th>
                  <th className="border border-black p-2">Date Début</th>
                  <th className="border border-black p-2">Date Fin</th>
                  <th className="border border-black p-2">Diplôme</th>
                  <th className="border border-black p-2">Observations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2">{employee.specialite || ''}</td>
                  <td className="border border-black p-2">{employee.etablissement || ''}</td>
                  <td className="border border-black p-2">{formatDate(employee.du)}</td>
                  <td className="border border-black p-2">{formatDate(employee.au)}</td>
                  <td className="border border-black p-2">{employee.diplome || ''}</td>
                  <td className="border border-black p-2">{employee.observations || ''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CareerSheet


