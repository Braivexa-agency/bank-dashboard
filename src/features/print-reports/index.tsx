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
import DetailedWorkCertificate from "./components/detailed-work-certificate";
import { useSearch } from "@tanstack/react-router";

function PrintReportsContent() {
  const { printReports, setOpen, open } = usePrintReports();
  const currentEmployee = useUiStore((state) => state.informationSheetCurrentRow);
  const search = useSearch({ strict: false }) as { view?: string };

  // Check if we should show the detailed work certificate view
  const showDetailedCertificate = search?.view === 'detailed' && currentEmployee;

  // Check if we should show the regular work certificate view
  const showWorkCertificate = search?.view === 'certificate' && currentEmployee;

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
    // Handle report generation logic here
    console.log(`Generating report: ${reportType}`)
  }

  const handleDownloadReport = (report: PrintReport) => {
    // Handle download logic here
    console.log(`Downloading report: ${report.title}`)
  }

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // In a real implementation, this would generate and download a PDF
    alert('PDF export functionality would be implemented here');
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
        
        <DetailedWorkCertificate employee={currentEmployee} />
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
        
        <WorkCertificate employee={currentEmployee} />
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