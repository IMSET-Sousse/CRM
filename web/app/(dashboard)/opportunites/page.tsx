import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OpportunitiesHeader } from "@/components/opportunities/opportunities-header"
import { OpportunitiesPipeline } from "@/components/opportunities/opportunities-pipeline"

export default function OpportunitiesPage() {
  return (
    <div className="flex flex-col">
      <OpportunitiesHeader />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Opportunités</h2>
            <p className="text-muted-foreground">Gérez votre pipeline de vente et suivez vos opportunités</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une opportunité
          </Button>
        </div>
        <OpportunitiesPipeline />
      </div>
    </div>
  )
}
