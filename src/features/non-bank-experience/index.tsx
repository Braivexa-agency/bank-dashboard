import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { NonBankExperienceDialogs } from "./components/non-bank-experience-dialogs";
import { NonBankExperienceTable } from "./components/non-bank-experience-table";
import { columns } from "./components/non-bank-experience-columns";
import NonBankExperienceProvider, {
  useNonBankExperience,
} from "./context/non-bank-experience-context";

function NonBankExperienceContent() {
  const { nonBankExperiences, setOpen } = useNonBankExperience();

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
              Non-Banking Experience
            </h2>
            <p className="text-muted-foreground">
              Manage non-banking experience records and employee information.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen("add")}>
              <span>Add </span> <IconPlus size={18} />
            </Button>
          </div>
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <NonBankExperienceTable data={nonBankExperiences} columns={columns} />
        </div>
      </Main>

      <NonBankExperienceDialogs />
    </>
  );
}

export default function NonBankExperience() {
  return (
    <NonBankExperienceProvider>
      <NonBankExperienceContent />
    </NonBankExperienceProvider>
  );
}
