import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { ProfessionalTrainingDialogs } from "./components/professional-training-dialogs";
import { ProfessionalTrainingTable } from "./components/professional-training-table";
import { columns } from "./components/professional-training-columns";
import ProfessionalTrainingProvider, {
  useProfessionalTraining,
} from "./context/professional-training-context";

function ProfessionalTrainingContent() {
  const { professionalTrainings, setOpen } = useProfessionalTraining();

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
              Professional Training
            </h2>
            <p className="text-muted-foreground">
              Manage professional training records and employee information.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen("add")}>
              <span>Add </span> <IconPlus size={18} />
            </Button>
          </div>
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <ProfessionalTrainingTable data={professionalTrainings} columns={columns} />
        </div>
      </Main>

      <ProfessionalTrainingDialogs />
    </>
  );
}

export default function ProfessionalTraining() {
  return (
    <ProfessionalTrainingProvider>
      <ProfessionalTrainingContent />
    </ProfessionalTrainingProvider>
  );
}