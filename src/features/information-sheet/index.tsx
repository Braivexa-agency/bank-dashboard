import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { InformationSheetDialogs } from "./components/information-sheet-dialogs";
import BankExperienceProvider from "@/features/bank-experience/context/bank-experience-context";
import { BankExperienceDialogs } from "@/features/bank-experience/components/bank-experience-dialogs";
import NonBankExperienceProvider from "@/features/non-bank-experience/context/non-bank-experience-context";
import { NonBankExperienceDialogs } from "@/features/non-bank-experience/components/non-bank-experience-dialogs";
import { InformationSheetTable } from "./components/information-sheet-table";
import { columns } from "./components/information-sheet-columns";
import { useUiActions } from "@/stores/useUiStore";
import { useDataStore } from "@/stores/useDataStore";

function InformationSheetContent() {
  const informationSheets = useDataStore((state) => state.informationSheets);
  const { openInformationSheet } = useUiActions();

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
              Employee Information Sheet
            </h2>
            <p className="text-muted-foreground">
              Manage comprehensive employee information, records, and banking experience.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => openInformationSheet("add")}>
              <span>Add </span> <IconPlus size={18} />
            </Button>
          </div>
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <InformationSheetTable data={informationSheets} columns={columns} />
        </div>
      </Main>

      <InformationSheetDialogs />
    </>
  );
}

export default function InformationSheet() {
  return (
    <BankExperienceProvider>
      <NonBankExperienceProvider>
        <InformationSheetContent />
        {/* Cross-feature dialogs to edit experiences from Information Sheet */}
        <BankExperienceDialogs />
        <NonBankExperienceDialogs />
      </NonBankExperienceProvider>
    </BankExperienceProvider>
  );
}