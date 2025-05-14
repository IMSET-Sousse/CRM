export function ProjectsReport() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Total projets</div>
          <div className="text-2xl font-bold">42</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Projets en cours</div>
          <div className="text-2xl font-bold">28</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Projets en retard</div>
          <div className="text-2xl font-bold">5</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Taux de complétion</div>
          <div className="text-2xl font-bold">68%</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-medium">Projets par statut</h3>
          <div className="h-[300px] w-full bg-muted/30" />
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-medium">Projets par type</h3>
          <div className="h-[300px] w-full bg-muted/30" />
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-medium">Durée moyenne des projets</h3>
        <div className="h-[300px] w-full bg-muted/30" />
      </div>
    </div>
  )
}
