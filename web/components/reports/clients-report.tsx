export function ClientsReport() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Total clients</div>
          <div className="text-2xl font-bold">127</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Clients actifs</div>
          <div className="text-2xl font-bold">98</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Nouveaux clients (30j)</div>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Taux de rétention</div>
          <div className="text-2xl font-bold">87%</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-medium">Clients par secteur</h3>
          <div className="h-[300px] w-full bg-muted/30" />
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-medium">Clients par région</h3>
          <div className="h-[300px] w-full bg-muted/30" />
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-medium">Évolution du nombre de clients</h3>
        <div className="h-[300px] w-full bg-muted/30" />
      </div>
    </div>
  )
}
