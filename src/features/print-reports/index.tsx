import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconPlus, IconFileText, IconDownload, IconClock, IconCheck, IconX, IconPrinter } from "@tabler/icons-react";
import PrintReportsProvider, {
  usePrintReports,
} from "./context/print-reports-context";
import type { PrintReport } from "./context/print-reports-context";
import { PrintReportsDialog } from "./components/print-reports-dialog";
import { useUiStore } from "@/stores/useUiStore";
import WorkCertificate from "./components/work-certificate";
import EnqueteWilaya from "./components/enquete-wilaya";
import EnqueteDaira from "./components/enquete-daira";
import DetailedWorkCertificate from "./components/detailed-work-certificate";
import CareerSheet from "./components/career-sheet";
import { useSearch } from "@tanstack/react-router";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function PrintReportsContent() {
  const { printReports, setOpen, open } = usePrintReports();
  const currentEmployee = useUiStore((state) => state.informationSheetCurrentRow);
  const search = useSearch({ strict: false }) as { view?: string };

  // Check if we should show the detailed work certificate view
  const showDetailedCertificate = search?.view === 'detailed' && currentEmployee;

  // Check if we should show the regular work certificate view
  const showWorkCertificate = search?.view === 'certificate' && currentEmployee;

  // Check if we should show the Enquête Wilaya view
  const showEnqueteWilaya = search?.view === 'enquete-wilaya' && currentEmployee;
  // Check if we should show the Enquête Daira view
  const showEnqueteDaira = search?.view === 'enquete-daira' && currentEmployee;
  // Check if we should show the Career Sheet view
  const showCareerSheet = search?.view === 'career' && currentEmployee;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'generating':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <IconCheck className="h-4 w-4" />
      case 'generating':
        return <IconClock className="h-4 w-4" />
      case 'completed':
        return <IconCheck className="h-4 w-4" />
      case 'error':
        return <IconX className="h-4 w-4" />
      default:
        return <IconFileText className="h-4 w-4" />
    }
  }

  const handleGenerateReport = (reportType: string) => {
    const viewMap: Record<string, string> = {
      'attestation': 'certificate',
      'certificat': 'detailed',
      'enquete-wilaya': 'enquete-wilaya',
      'enquete-daira': 'enquete-daira',
      'fiche-carriere': 'career',
    };

    const view = viewMap[reportType];
    if (view) {
      window.location.assign(`/_authenticated/print-reports/?view=${view}`)
    }
  }

  const handleDownloadReport = (report: PrintReport) => {
    // Handle download logic here
    console.log(`Downloading report: ${report.title}`)
  }

  const handlePrint = async () => {
    console.log('Print button clicked');
    
    // Give the DOM a moment to fully render
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Get the certificate content element
    const element = document.querySelector('.font-serif');
    
    if (element) {
      console.log('Found certificate element, preparing for print...');
      
      // Add a temporary class to the element for print styling
      element.classList.add('print-only');
      
      // Trigger print
      window.print();
      
      // Remove the temporary class after a delay
      setTimeout(() => {
        element.classList.remove('print-only');
      }, 1000);
    } else {
      console.error('Certificate element not found, printing entire page');
      window.print();
    }
  };

  const handleExportPDF = async () => {
    console.log('Export PDF button clicked');
    
    // Give the DOM a moment to fully render
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Get the certificate content element
    const element = document.querySelector('.font-serif');
    
    if (element) {
      console.log('Found certificate element, generating PDF...');
      try {
        // Use html2canvas to capture the element as canvas
        const canvas = await html2canvas(element as HTMLElement, {
          useCORS: true,
          logging: false,
          background: '#ffffff'
        });
        
        console.log('Canvas generated, creating PDF...');
        const imgData = canvas.toDataURL('image/png');
        
        // Create PDF with explicit dimensions
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        // Get image dimensions
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        // Calculate dimensions to fit the image in the PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
        
        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        // Generate filename
        const filename = showDetailedCertificate ? 'detailed-work-certificate.pdf' : 'work-certificate.pdf';
        console.log('Saving PDF as:', filename);
        
        // Save the PDF
        pdf.save(filename);
        console.log('PDF saved successfully');
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again or use the Print option.');
      }
    } else {
      console.error('Certificate element not found');
      alert('Unable to find certificate content. Please try refreshing the page.');
    }
  };

  // If we should show the detailed work certificate, render it directly
  if (showDetailedCertificate && currentEmployee) {
    return (
      <Main>
        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" onClick={handlePrint}>
            <IconPrinter className="mr-2" />
            Print
          </Button>
          <Button variant="secondary" onClick={handleExportPDF}>
            <IconDownload className="mr-2" />
            Export PDF
          </Button>
        </div>
        
        <DetailedWorkCertificate 
          employee={currentEmployee} 
        />
      </Main>
    );
  }

  // If we should show the regular work certificate, render it directly
  if (showWorkCertificate && currentEmployee) {
    return (
      <Main>
        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" onClick={handlePrint}>
            <IconPrinter className="mr-2" />
            Print
          </Button>
          <Button variant="secondary" onClick={handleExportPDF}>
            <IconDownload className="mr-2" />
            Export PDF
          </Button>
        </div>
        
        <WorkCertificate 
          employee={currentEmployee} 
        />
      </Main>
    );
  }

  // If we should show the Enquête Wilaya, render it directly
  if (showEnqueteWilaya && currentEmployee) {
    return (
      <Main>
        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" onClick={handlePrint}>
            <IconPrinter className="mr-2" />
            Print
          </Button>
          <Button variant="secondary" onClick={handleExportPDF}>
            <IconDownload className="mr-2" />
            Export PDF
          </Button>
        </div>
        <EnqueteWilaya employee={currentEmployee} />
      </Main>
    );
  }

  // If we should show the Enquête Daira, render it directly
  if (showEnqueteDaira && currentEmployee) {
    return (
      <Main>
        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" onClick={handlePrint}>
            <IconPrinter className="mr-2" />
            Print
          </Button>
          <Button variant="secondary" onClick={handleExportPDF}>
            <IconDownload className="mr-2" />
            Export PDF
          </Button>
        </div>
        <EnqueteDaira employee={currentEmployee} />
      </Main>
    );
  }

  // If we should show the career sheet, render it directly
  if (showCareerSheet && currentEmployee) {
    return (
      <Main>
        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" onClick={handlePrint}>
            <IconPrinter className="mr-2" />
            Print
          </Button>
          <Button variant="secondary" onClick={handleExportPDF}>
            <IconDownload className="mr-2" />
            Export PDF
          </Button>
        </div>
        <CareerSheet employee={currentEmployee} />
      </Main>
    );
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Print Reports
            </h2>
            <p className="text-muted-foreground">
              Generate and manage employee reports and certificates.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen("add")}>
              <span>Generate Report</span> <IconPlus size={18} />
            </Button>
          </div>
        </div>

        {/* Report Generation Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Available Reports
              </CardTitle>
              <CardDescription>
                Generate and download employee reports and certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {printReports.map((report) => (
                  <Card key={report.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconFileText className="h-5 w-5 text-primary" />
                          <CardTitle className="text-sm font-medium">
                            {report.title}
                          </CardTitle>
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(report.status)}
                            <span className="capitalize">{report.status}</span>
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {report.description}
                      </p>
                      <div className="flex justify-between">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleGenerateReport(report.type)}
                          disabled={report.status === 'generating'}
                          className="text-xs"
                        >
                          {report.status === 'generating' ? (
                            <>
                              <IconClock className="h-3 w-3 mr-1" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <IconFileText className="h-3 w-3 mr-1" />
                              Generate
                            </>
                          )}
                        </Button>
                        {report.status === 'completed' && (
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => handleDownloadReport(report)}
                            className="text-xs"
                          >
                            <IconDownload className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                      {report.generatedAt && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Generated: {new Date(report.generatedAt).toLocaleDateString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>

      <PrintReportsDialog open={open === 'add'} onOpenChange={(isOpen) => setOpen(isOpen ? 'add' : null)} />
    </>
  );
}

export default function PrintReports() {
  return (
    <PrintReportsProvider>
      <PrintReportsContent />
    </PrintReportsProvider>
  );
}