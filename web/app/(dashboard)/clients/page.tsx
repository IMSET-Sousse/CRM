import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientsTable } from "@/components/clients/clients-table"
import { ClientsHeader } from "@/components/clients/clients-header"

export default function ClientsPage() {
  return (
    <div className="flex flex-col">
      <ClientsHeader />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
            <p className="text-muted-foreground">Gérez vos clients et leurs informations</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un client
          </Button>
        </div>
        <ClientsTable />
      </div>
    </div>
  )
}
