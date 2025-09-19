import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { DisciplinaryActionsDialogs } from "./components/disciplinary-actions-dialogs";
import { DisciplinaryActionsTable } from "./components/disciplinary-actions-table";
import { columns } from "./components/disciplinary-actions-columns";
import DisciplinaryActionProvider, {
  useDisciplinaryAction,
} from "./context/disciplinary-actions-context";

function DisciplinaryActionsContent() {
  const { disciplinaryActions, setOpen } = useDisciplinaryAction();

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
              Disciplinary Actions
            </h2>
            <p className="text-muted-foreground">
              Manage disciplinary actions and employee sanctions.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen("add")}>
              <span>Add </span> <IconPlus size={18} />
            </Button>
          </div>
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <DisciplinaryActionsTable data={disciplinaryActions} columns={columns} />
        </div>
      </Main>

      <DisciplinaryActionsDialogs />
    </>
  );
}

export default function DisciplinaryActions() {
  return (
    <DisciplinaryActionProvider>
      <DisciplinaryActionsContent />
    </DisciplinaryActionProvider>
  );
}