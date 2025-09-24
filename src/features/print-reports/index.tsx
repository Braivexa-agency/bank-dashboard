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

function PrintReportsContent() {
  const { printReports, setOpen, open } = usePrintReports();

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

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <div className="space-y-6">
            {/* Employee Information Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Employee Information
                </CardTitle>
                <CardDescription>
                  Enter employee details to generate reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Employee ID</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter employee ID"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Position</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Current position"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Department"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hire Date</label>
                    <input 
                      type="date" 
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CNAS & Administrative Survey Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    CNAS Declaration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Member Number</label>
                      <input 
                        type="text" 
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="CNAS member number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Member Address</label>
                      <input 
                        type="text" 
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Full address"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    Administrative Survey & Bulletin #02
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Birth Wilaya</label>
                      <input 
                        type="text" 
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Birth wilaya"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Residence Wilaya</label>
                      <input 
                        type="text" 
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Residence wilaya"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Phone number"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Wilaya Survey
                      </Button>
                      <Button variant="outline" size="sm">
                        Daira Survey
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Report Generation Section */}
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
                              {report.status}
                            </div>
                          </Badge>
                        </div>
                        <CardDescription className="text-xs">
                          {report.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleGenerateReport(report.type)}
                            disabled={report.status === 'generating'}
                          >
                            <IconPrinter className="h-4 w-4 mr-1" />
                            Generate
                          </Button>
                          {report.downloadUrl && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDownloadReport(report)}
                            >
                              <IconDownload className="h-4 w-4" />
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