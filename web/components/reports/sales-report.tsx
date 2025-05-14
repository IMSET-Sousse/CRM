export function SalesReport() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Chiffre d&apos;affaires</div>
          <div className="text-2xl font-bold">€245,000</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Pipeline de vente</div>
          <div className="text-2xl font-bold">€120,000</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Taux de conversion</div>
          <div className="text-2xl font-bold">32%</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm font-medium text-muted-foreground">Valeur moyenne</div>
          <div className="text-2xl font-bold">€12,250</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-medium">Ventes par trimestre</h3>
          <div className="h-[300px] w-full bg-muted/30" />
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-medium">Opportunités par étape</h3>
          <div className="h-[300px] w-full bg-muted/30" />
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-medium">Prévisions de vente</h3>
        <div className="h-[300px] w-full bg-muted/30" />
      </div>
    </div>
  )
}
