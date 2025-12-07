import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { InformationSheet } from '@/stores/dataStore'
import { usePrintReports } from '../context/print-reports-context'

interface EnqueteWilayaProps {
  employee: InformationSheet
}

const EnqueteWilaya: React.FC<EnqueteWilayaProps> = ({ employee }) => {
  const { enqueteInfo } = usePrintReports()

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR')
  }

  const rows = [
    {
      serial: '01',
      name: employee.prenomAr && employee.nomAr 
        ? `${employee.prenomAr} ${employee.nomAr}`.trim()
        : `${employee.prenom || ''} ${employee.nom || ''}`.trim(),
      birth: employee.dateOfBirth ? `${formatDate(employee.dateOfBirth)} - ${employee.wilayaNaissance || enqueteInfo?.wilayaNaissance || ''}` : '',
      parents: employee.fatherNameAr && employee.motherNameAr
        ? `${employee.fatherNameAr} / ${employee.motherNameAr}${employee.motherLastNameAr ? ' ' + employee.motherLastNameAr : ''}`.trim()
        : `${employee.fatherName || ''} / ${employee.motherName || ''}`.trim(),
      address: employee.adresseAr || employee.address || '',
      phone: enqueteInfo?.numeroTelephone || '',
    },
    {
      serial: '02',
      name: '',
      birth: '',
      parents: '',
      address: '',
      phone: '',
    },
  ]

  return (
    <div className="font-serif leading-relaxed bg-white text-black dark:bg-black dark:text-white print:bg-white print:text-black">
      <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 print:bg-white print:border-none">
        <CardContent className="p-8 print:p-4">
          <div className="flex justify-between mb-6 text-sm" style={{ direction: 'ltr' }}>
            <div className="text-left">
              <p className="m-0">Division</p>
              <p className="m-0">« 012 »</p>
              <p className="m-0">N° ______ / D / 25</p>
            </div>
            <div className="text-right" style={{ direction: 'rtl' }}>
              <p className="m-0">الجزائر في ____ / ____ / 2025</p>
            </div>
          </div>

          <div className="mb-4" style={{ direction: 'rtl', textAlign: 'right' }}>
            <p className="font-bold m-0">مديرية الأمن الإداري لولاية الجزائر</p>
            <p className="font-bold m-0">الموضوع: طلب تحقيق إداري</p>
          </div>

          <p className="mt-4" style={{ direction: 'rtl' }}>
            لنا الشرف أن نتقدم إلى سيادتكم بطلب تحقيق للمعنيين المدونة أسماؤهم في الجدول والذي تم توظيفهم لدى
          </p>

          <div className="mt-4">
            <table className="w-full border border-black border-collapse text-center">
              <thead>
                <tr>
                  <th className="border border-black p-2">الرقم</th>
                  <th className="border border-black p-2">الاسم واللقب</th>
                  <th className="border border-black p-2">تاريخ و مكان الميلاد</th>
                  <th className="border border-black p-2">النسب (الأبوين)</th>
                  <th className="border border-black p-2">العنوان</th>
                  <th className="border border-black p-2">الهاتف</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx}>
                    <td className="border border-black p-2">{r.serial}</td>
                    <td className="border border-black p-2">{r.name}</td>
                    <td className="border border-black p-2">{r.birth}</td>
                    <td className="border border-black p-2">{r.parents}</td>
                    <td className="border border-black p-2">{r.address}</td>
                    <td className="border border-black p-2">{r.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6" style={{ direction: 'rtl' }}>
            في انتظار ردكم تقبلوا منا سيدي فائق التقدير و الاحترام.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default EnqueteWilaya


