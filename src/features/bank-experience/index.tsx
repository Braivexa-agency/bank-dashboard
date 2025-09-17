import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { BankExperienceDialogs } from "./components/bank-experience-dialogs";
import { BankExperienceTable } from "./components/bank-experience-table";
import { columns } from "./components/bank-experience-columns";
import BankExperienceProvider, { useBankExperience } from "./context/bank-experience-context";

function BankExperienceContent() {
  const { bankExperiences, setOpen } = useBankExperience();

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
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Banking Experience</h2>
            <p className='text-muted-foreground'>
              Manage banking experience records and employee information.
            </p>
          </div>
          <div className='flex gap-2'>
        
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Add</span> <IconPlus size={18} />
            </Button>
          </div>
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <BankExperienceTable data={bankExperiences} columns={columns} />
        </div>
      </Main>

      <BankExperienceDialogs />
    </>
  );
}

export default function BankExperience() {
  return (
    <BankExperienceProvider>
      <BankExperienceContent />
    </BankExperienceProvider>
  );
}
