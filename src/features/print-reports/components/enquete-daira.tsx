import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { InformationSheet } from '@/stores/dataStore'
import { usePrintReports } from '../context/print-reports-context'

interface EnqueteDairaProps {
  employee: InformationSheet
}

const EnqueteDaira: React.FC<EnqueteDairaProps> = ({ employee }) => {
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
            <div className="text-right" style={{ direction: 'rtl' }}>
              <p className="m-0">Division</p>
              <p className="m-0" style={{ textAlign: 'left' }}>« 012 »</p>
              <p className="m-0" style={{ textAlign: 'left' }}>N° ______ / D / 25</p>
            </div>
            <div className="text-left">
              <p className="m-0">الجزائر في ____ / ____ / 2025</p>
            </div>
          </div>

          <p className="text-center font-bold my-2" style={{ direction: 'rtl' }}>الى السيد : الوالي المنتدب للمقاطعة الإدارية</p>
          <p className="my-2" style={{ direction: 'rtl' }}>الموضوع: طلب التحقيقات الإدارية</p>
          <p className="my-2" style={{ direction: 'rtl' }}>
            لنا الشرف العظيم أن نتقدم إلى سيادتكم بطلبنا هذا و المتمثل في طلب اجراء التحقيقات الإدارية الخاصة بالموظفين المبينين في الجدول المرفق.
          </p>
          <p className="my-2" style={{ direction: 'rtl' }}>
            في انتظار ردكم تقبلوا منا سيدي فائق التقدير و الاحترام.
          </p>

          <div className="mt-10 page-break-before">
            <h3 className="mb-2" style={{ direction: 'rtl' }}>الجدول:</h3>
            <table className="w-full border border-black border-collapse text-center">
              <thead>
                <tr>
                  <th className="border border-black p-2">الرقم</th>
                  <th className="border border-black p-2">الاسم و اللقب</th>
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
        </CardContent>
      </Card>
    </div>
  )
}

export default EnqueteDaira


